# This script exists because I can't be bothered to get Jekyll running locally
import os.path
import http.server
import requests

PORT = 8000

# forward any HTML requests to chroma.zone, use local directory otherwise
class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.endswith('/') or self.path.endswith('.html'):
            return self.forward_request()
        if not os.path.exists(self.translate_path(self.path)):
            return self.forward_request()
        return super().do_GET()

    def forward_request(self):
        url = 'http://chroma.zone' + self.path.replace('.html', '')
        print('Forward', url)
        headers = {'Host': 'chroma.zone', 'Accept': 'text/html'}
        resp = requests.get(url, headers=headers, verify=False)
        self.send_response(resp.status_code)
        self.end_headers()
        self.wfile.write(resp.content)
        self.wfile.flush()

with http.server.HTTPServer(('', PORT), CustomHandler) as server:
    print(f'http://localhost:{PORT}/')
    server.serve_forever()
