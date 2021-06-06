function FindProxyForURL(url, host) {
  if (shExpMatch(host, "*.internal") ||
      shExpMatch(host, "proxy.jsx.jp")) {
    return "DIRECT";
  }

  if (/^\d+\.\d+\.\d+\.\d+$/.test(host) &&
      (isInNet(host, "10.0.0.0", "255.0.0.0") ||
       isInNet(host, "172.16.0.0", "255.240.0.0") ||
       isInNet(host, "192.168.0.0", "255.255.0.0") ||
       isInNet(host, "127.0.0.0", "255.255.255.0"))) {
    return "DIRECT";
  }

  if (shExpMatch(host, "google.co.jp") ||
      shExpMatch(host, "taruo.net") ||
      shExpMatch(host, "jsx.jp")) {
    return "PROXY proxy.aws.jsx.jp:3128";
  }

  if (shExpMatch(host, "*.onelogin.com") ||
      shExpMatch(host, "*.secure-place.*")) {
    return "PROXY proxy.jsx.jp:8080";
  }

  if (shExpMatch(host, "api.*.*.com") ||
      shExpMatch(host, "*.*-api.*.*.com") ||
      shExpMatch(host, "*.jp.*.*.tech")) {
    return "PROXY proxy.jsx.jp:8080";
  }

  return "DIRECT";
}
