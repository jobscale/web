function FindProxyForURL(url, host) {
  if (shExpMatch(host, "proxy.*")) {
    return "DIRECT";
  }

  if (/^\d+\.\d+\.\d+\.\d+$/.test(host) &&
      (isInNet(host, "10.0.0.0", "255.0.0.0") ||
       isInNet(host, "172.16.0.0", "255.240.0.0") ||
       isInNet(host, "192.168.0.0", "255.255.0.0") ||
       isInNet(host, "127.0.0.0", "255.255.255.0"))) {
    return "DIRECT";
  }

  if (shExpMatch(host, "cdn.jsx.jp") ||
      shExpMatch(host, "*.cdn.jsx.jp") ||
      shExpMatch(host, "*.nip.io") ||
      shExpMatch(host, "*.xip.io")) {
    return "DIRECT";
  }

  // no_proxy: 192.168.0.0./16, 172.16.0.0./12, 10.0.0.0/8, localhost, 127.0.0.0/8, ::1
  // no_proxy: in.jsx.jp, os.jsx.jp, us.jsx.jp, eu.jsx.jp

  if (shExpMatch(host, "*.internal")) {
    return "SOCKS proxy.in.jsx.jp:3128";
  }

  if (shExpMatch(host, "jsx.jp") ||
      shExpMatch(host, "*.jsx.jp")) {
    return "PROXY proxy.us.jsx.jp:3128";
  }

  if (shExpMatch(host, "nicobo.jp") ||
      shExpMatch(host, "*.nicobo.jp")) {
    return 'PROXY proxy.jp.jsx.jp:443';
  }

  if (shExpMatch(host, "*.panasonic.co.jp") ||
      shExpMatch(host, "*.panasonic.com")) {
    return "PROXY proxy.in.jsx.jp:8080";
  }

  if (shExpMatch(host, "*.cloudfront.net")) {
    return "PROXY proxy.in.jsx.jp:8080";
  }

  if (shExpMatch(host, "*.microsoft.com") ||
      shExpMatch(host, "*.microsoftonline.com") ||
      shExpMatch(host, "*.office.com")) {
    return "SOCKS proxy.in.jsx.jp:3128";
    # return "PROXY proxy.in.jsx.jp:8080";
  }

  if (shExpMatch(host, "*.aws.amazon.com") ||
      shExpMatch(host, "*.amazonaws.com")) {
    return "PROXY proxy.in.jsx.jp:8080";
  }

  if (shExpMatch(host, "*.amazon.co.jp") ||
      shExpMatch(host, "*.amazon.com")) {
    return "PROXY proxy.in.jsx.jp:8080";
  }

  if (shExpMatch(host, "*.google.co.jp") ||
      shExpMatch(host, "*.google.com")) {
    return "PROXY proxy.us.jsx.jp:3128";
  }

  return "PROXY proxy.jsx.jp:3128; DIRECT";
}
