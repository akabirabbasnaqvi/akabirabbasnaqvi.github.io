import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";
import { createBrotliCompress, createGzip } from "node:zlib";

const outputDirectory = resolve("out");
const port = Number.parseInt(process.env.PORT ?? "3000", 10);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};
const compressibleExtensions = new Set([".css", ".html", ".js", ".json", ".svg"]);

function resolveFile(requestUrl) {
  const pathname = decodeURIComponent(requestUrl.split("?")[0] || "/");
  const requestedPath = pathname.replace(/^[/\\]+/, "");
  const target = resolve(outputDirectory, requestedPath);

  if (target !== outputDirectory && !target.startsWith(`${outputDirectory}${sep}`)) {
    return null;
  }

  if (existsSync(target) && statSync(target).isDirectory()) {
    return join(target, "index.html");
  }

  return target;
}

const server = createServer((request, response) => {
  const file = resolveFile(request.url ?? "/");

  if (!file || !existsSync(file)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const extension = extname(file);
  const headers = {
    "Content-Type": contentTypes[extension] ?? "application/octet-stream",
    "Cache-Control": "no-cache",
  };
  const acceptedEncodings = request.headers["accept-encoding"] ?? "";
  const shouldCompress = compressibleExtensions.has(extension);

  if (shouldCompress && acceptedEncodings.includes("br")) {
    response.writeHead(200, { ...headers, "Content-Encoding": "br", Vary: "Accept-Encoding" });
    createReadStream(file).pipe(createBrotliCompress()).pipe(response);
    return;
  }

  if (shouldCompress && acceptedEncodings.includes("gzip")) {
    response.writeHead(200, { ...headers, "Content-Encoding": "gzip", Vary: "Accept-Encoding" });
    createReadStream(file).pipe(createGzip()).pipe(response);
    return;
  }

  response.writeHead(200, headers);
  createReadStream(file).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Static portfolio preview: http://127.0.0.1:${port}`);
});
