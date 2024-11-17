const proxyName = "节点选择";

// 国内DNS服务器
const domesticNameservers = [
  "https://dns.alidns.com/dns-query", // 阿里云公共DNS
  "https://doh.pub/dns-query", // 腾讯DNSPod
  "https://doh.360.cn/dns-query" // 360安全DNS
];
// 国外DNS服务器
const foreignNameservers = [
  "https://1.1.1.1/dns-query", // Cloudflare(主)
  "https://1.0.0.1/dns-query", // Cloudflare(备)
  "https://208.67.222.222/dns-query", // OpenDNS(主)
  "https://208.67.220.220/dns-query", // OpenDNS(备)
  "https://194.242.2.2/dns-query", // Mullvad(主)
  "https://194.242.2.3/dns-query" // Mullvad(备)
]
// DNS配置
const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  "ipv6": true,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    // 本地主机/设备
    "+.lan",
    "+.local",
    // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com"
  ],
  "default-nameserver": ["223.5.5.5","223.6.6.6", "119.29.29.29", "1.1.1.1", "8.8.8.8"],
  "nameserver": [...domesticNameservers, ...foreignNameservers],
  "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
  "nameserver-policy": {
    "geosite:private,cn,geolocation-cn": domesticNameservers,
    "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers
  }
};
const dnsConfig2 = {
enable: true,
"prefer-h3": true,
listen: ":1053",
"enhanced-mode": "fake-ip",
"fake-ip-range": "28.0.0.1/8",
"fake-ip-filter":
["*",
"+.lan",
"+.local"],
nameserver:
["https://8.8.8.8/dns-query",
"https://1.1.1.1/dns-query"],
"nameserver-policy":
{"geosite:cn,private":
["https://223.5.5.5/dns-query",
"https://223.6.6.6/dns-query"]}

}

const dnsConfig3 = {
  enable: true,
  "prefer-h3": true,
  "use-hosts": true,
  "use-system-hosts": true,
  "respect-rules": false,
  listen: "0.0.0.0:1053",
  ipv6: true,
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter":
    ["*.lan",
    "+.local",
    "localhost.ptlogin2.qq.com"],
  "default-nameserver":
    ["tls://1.12.12.12",
    "223.5.5.5",
    "119.29.29.29"],
  "nameserver-policy":
    {"www.baidu.com": "114.114.114.114",
    "+.internal.crop.com": "10.0.0.1",
    "geosite:cn,private":
      ["https://223.5.5.5/dns-query",
      "https://223.6.6.6/dns-query"]},
  nameserver:
    ["https://dns.alidns.com/dns-query",
    "https://doh.pub/dns-query"],
  "proxy-server-nameserver":
    ["https://dns.alidns.com/dns-query",
    "https://doh.pub/dns-query"],
  fallback:
    ["tls://1dot1dot1dot1.cloudflare-dns.com",
    "tcp://1.1.1.1",
    "https://1.0.0.1/dns-query",
    "https://1.1.1.1/dns-query"],
  "fallback-filter":
    {geoip: true,
    "geoip-code": "CN",
    geosite:
      ["gfw",],
    ipcidr:
      ["240.0.0.0/4",
      "0.0.0.0/32",
      "127.0.0.1/32"],
    domain:
      ["+.google.com",
      "+.facebook.com",
      "+.youtube.com"]
      }
    }

// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  // "format": "yaml",
  "interval": 86400
};
// 规则集配置
const ruleProviders = {
  unproxy: {behavior: "classical",url: "https://raw.githubusercontent.com/ninoleee/clash/refs/heads/main/UnProxy.yaml",path: "./ruleset2/own/UnProxy.yaml",...ruleProviderCommon,},
  applications: {behavior: "classical","format": "text",url: "https://github.com/DustinWin/ruleset_geodata/releases/download/clash-ruleset/applications.list",path: "./ruleset2/applications.list",...ruleProviderCommon,},
  private: {behavior: "domain",format: "mrs",url: "https://github.com/DustinWin/ruleset_geodata/releases/download/clash-ruleset/private.mrs",path: "./ruleset2/private.mrs",...ruleProviderCommon,},
  steamcn: {behavior: "domain",format: "mrs",url: "https://github.com/DustinWin/ruleset_geodata/releases/download/clash-ruleset/games-cn.mrs",path: "./ruleset2/SteamCN.mrs",...ruleProviderCommon,},
  apple: {behavior: "classical",url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Apple/Apple_Classical_No_Resolve.yaml",path: "./ruleset2/blackmatrix7/Apple_Classical_No_Resolve.yaml",...ruleProviderCommon,},
  microsoft: {behavior: "classical",url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Microsoft/Microsoft_No_Resolve.yaml",path: "./ruleset2/blackmatrix7/Microsoft_No_Resolve.yaml",...ruleProviderCommon,},
  cnmedia: {behavior: "classical",url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_No_Resolve.yaml",path: "./ruleset2/blackmatrix7/ChinaMedia_No_Resolve.yaml",...ruleProviderCommon,},
  cnmax_nomedia: {behavior: "domain",format: "mrs",url: "https://github.com/DustinWin/ruleset_geodata/releases/download/clash-ruleset/cn.mrs",path: "./ruleset2/cn.mrs",...ruleProviderCommon,},
  cnip: {behavior: "ipcidr",format: "mrs",url: "https://github.com/DustinWin/ruleset_geodata/releases/download/clash-ruleset/cnip.mrs",path: "./ruleset2/cnip.mrs",...ruleProviderCommon,},

  myproxy: {behavior: "classical",url: "https://raw.githubusercontent.com/ninoleee/clash/refs/heads/main/MyProxy.yaml",path: "./ruleset2/own/MyProxy.yaml",...ruleProviderCommon,},
  crypto: {behavior: "classical",url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Crypto/Crypto.yaml",path: "./ruleset2/blackmatrix7/Crypto.yaml",...ruleProviderCommon,},
  ai: {behavior: "domain",format: "mrs",url: "https://github.com/DustinWin/ruleset_geodata/releases/download/clash-ruleset/ai.mrs",path: "./ruleset2/ai.mrs",...ruleProviderCommon,},
  glbmedia: {behavior: "classical",url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/GlobalMedia/GlobalMedia_Classical_No_Resolve.yaml",path: "./ruleset2/blackmatrix7/GlobalMedia_Classical_No_Resolve.yaml",...ruleProviderCommon,},
  proxy: {behavior: "domain",format: "mrs",url: "https://github.com/DustinWin/ruleset_geodata/releases/download/clash-ruleset/proxy.mrs",path: "./ruleset2/proxy.mrs",...ruleProviderCommon,},
  reject: {behavior: "domain",path: "./ruleset2/reject.mrs",...ruleProviderCommon,
    format: "mrs",url: "https://github.com/DustinWin/ruleset_geodata/releases/download/clash-ruleset/ads.mrs"
  },

};
// 规则
const rules = [
  // 自定义规则
  "RULE-SET,unproxy,DIRECT",
  "RULE-SET,myproxy,"+ proxyName,,
  // Loyalsoldier 规则集// blackmatrix7 规则集dsf
  "RULE-SET,reject,全局拦截",
  "RULE-SET,applications,DIRECT",
  "RULE-SET,private,DIRECT",

  "RULE-SET,ai,ai",
  "RULE-SET,crypto,加密",
  "RULE-SET,steamcn,DIRECT",
  "RULE-SET,apple,苹果服务",
  "RULE-SET,microsoft,微软服务",

  "RULE-SET,cnmedia,国内媒体",
  "RULE-SET,glbmedia,国外媒体",

  // 国外规则集
  "RULE-SET,proxy,"+ proxyName,

  // 国内规则集
  "RULE-SET,cnmax_nomedia,DIRECT,no-resolve",
  "RULE-SET,cnip,DIRECT",
  // 其他规则
  "GEOIP,CN,DIRECT,no-resolve",
  "MATCH,漏网之鱼"
];
// 代理组通用配置
const groupBaseOption = {
  "interval": 300,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false
};
function getProxiesByRegex(config, regex) {
  return config.proxies.filter((e) => regex.test(e.name)).map((e) => e.name);
}
// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  const autoProxyGroupRegexs = [
    { name: "HK-自动选择", regex: /香港|HK|Hong|🇭🇰/ },
    { name: "TW-自动选择", regex: /台湾|TW|Taiwan|Wan|🇨🇳|🇹🇼/ },
    { name: "SG-自动选择", regex: /新加坡|狮城|SG|Singapore|🇸🇬/ },
    { name: "JP-自动选择", regex: /日本|JP|Japan|🇯🇵/ },
    { name: "US-自动选择", regex: /美国|US|United States|America|🇺🇸/ },
  ];

  const autoProxyGroups = autoProxyGroupRegexs
    .map((item) => ({
        name: item.name,
        type: "url-test",
        url: "http://www.gstatic.com/generate_204",
        interval: 300,
        tolerance: 50,
        proxies: getProxiesByRegex(config, item.regex),
        hidden: true,
    }))
    .filter((item) => item.proxies.length > 0);

  // 覆盖原配置中的代理组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "节点选择",
      "type": "select",
      "proxies": ["延迟选优", ...autoProxyGroups.map((item) => item.name),"故障转移", "负载均衡(散列)", "负载均衡(轮询)",],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
    },
    {
      ...groupBaseOption,
      "name": "延迟选优",
      "type": "url-test",
      "tolerance": 100,
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
    },
    ...autoProxyGroups,
    {
      ...groupBaseOption,
      "name": "故障转移",
      "type": "fallback",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
    },
    {
      ...groupBaseOption,
      "name": "负载均衡(散列)",
      "type": "load-balance",
      "strategy": "consistent-hashing",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg"
    },
    {
      ...groupBaseOption,
      "name": "负载均衡(轮询)",
      "type": "load-balance",
      "strategy": "round-robin",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg"
    },
    {
      ...groupBaseOption,
      "name": "ai",
      "type": "select",
      "proxies": ["US-自动选择", "延迟选优",...autoProxyGroups.map((item) => item.name),"故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/AI.png"
    },
    {
      ...groupBaseOption,
      "name": "加密",
      "type": "select",
      "proxies": [ "延迟选优", ...autoProxyGroups.map((item) => item.name),"故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Cryptocurrency_3.png"
    },
    {
      ...groupBaseOption,
      "name": "国内媒体",
      "type": "select",
      "proxies": ["全局直连","延迟选优", ...autoProxyGroups.map((item) => item.name), "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
      // "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/bilibili.png"
    },
    {
      ...groupBaseOption,
      "name": "国外媒体",
      "type": "select",
      "proxies": [ "延迟选优",...autoProxyGroups.map((item) => item.name), "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
      // "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
    },
    {
      ...groupBaseOption,
      "name": "微软服务",
      "type": "select",
      "proxies": ["全局直连", "延迟选优",...autoProxyGroups.map((item) => item.name), "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
      // "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
    },
    {
      ...groupBaseOption,
      "name": "苹果服务",
      "type": "select",
      "proxies": ["全局直连", "延迟选优",...autoProxyGroups.map((item) => item.name), "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
      // "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
    },
    {
      ...groupBaseOption,
      "name": "全局直连",
      "type": "select",
      "proxies": ["DIRECT", "延迟选优",...autoProxyGroups.map((item) => item.name), "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
      // "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "全局拦截",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg"
    },
    {
      ...groupBaseOption,
      "name": "漏网之鱼",
      "type": "select",
      "proxies": [ "延迟选优",...autoProxyGroups.map((item) => item.name), "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
      // "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
    }
  ];

  // 覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;

  // 覆盖原配置中DNS配置
  config["dns"] = dnsConfig;
  // overwriteDns(config)

  // 返回修改后的配置
  return config;
}

