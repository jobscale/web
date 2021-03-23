function FindProxyForURL(url, host) {
  if (shExpMatch(url, "geocontrol1.stream.ne.jp/fod-geo/check.xml")) {
    return "DIRECT";
  }

  if (shExpMatch(url, "*.internal:*/*")) {
    return "DIRECT";
  }

  if (/^\d+\.\d+\.\d+\.\d+$/.test(host) &&
      (isInNet(host, "10.0.0.0", "255.0.0.0") ||
       isInNet(host, "172.16.0.0", "255.240.0.0") ||
       isInNet(host, "192.168.0.0", "255.255.0.0"))) {
    return "DIRECT";
  }

  return "PROXY proxy.secure.jsx.jp:3128; DIRECT";
}
