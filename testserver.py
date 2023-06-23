import os.path
import http.server
import requests

PORT = 8000

# forward any HTML requests to chroma.zone, use local directory otherwise
class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.endswith('/'):
            return self.forward_request()
        _, ext = os.path.splitext(self.path)
        if ext == '.html' or ext == '':
            return self.forward_request()
        return super().do_GET()

    def forward_request(self):
        url = 'http://chroma.zone' + self.path.replace('.html', '')
        headers = {'Host': 'chroma.zone', 'Accept': 'text/html'}
        resp = requests.get(url, headers=headers, verify=False)
        self.send_response(resp.status_code)
        self.end_headers()
        self.wfile.write(resp.content)
        self.wfile.flush()

with http.server.HTTPServer(('', 8000), CustomHandler) as server:
    server.serve_forever()