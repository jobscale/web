function FindProxyForURL(url, host) {
  if (shExpMatch(host, "*.internal")) {
    return "DIRECT";
  }

  if (/^\d+\.\d+\.\d+\.\d+$/.test(host) &&
      (isInNet(host, "10.0.0.0", "255.0.0.0") ||
       isInNet(host, "172.16.0.0", "255.240.0.0") ||
       isInNet(host, "192.168.0.0", "255.255.0.0") ||
       isInNet(host, "127.0.0.0", "255.255.255.0"))) {
    return "DIRECT";
  }

  if (shExpMatch(host, "google") ||
      shExpMatch(host, "atlassian")) {
    return "PROXY proxy.aws.jsx.jp:3128";
  }

  return "DIRECT";
}
