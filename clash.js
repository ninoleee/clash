const proxyName = "节点选择";

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

  // 国���规则集
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
      // 添加自用代理
      config.proxies.push (
        // { name: '', type: 'vless', server: '', port: 200, cipher: 'tls', password: '', udp: true },
      );
      
      const url = "";
      if (url) {
        config["proxy-providers"]["etlqyfnnfr"] = {
          type: "http",
          path: "./etlqyfnnfr_provider.yaml",
          url: url,
          interval: 3600,
          "health-check": {
            enable: false,
            url: "http://www.gstatic.com/generate_204",
            interval: 300
          }
        };
      }

      const proxyCount = config?.proxies?.length ?? 0;
      const proxyProviderCount =
        typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
      if (proxyCount === 0 && proxyProviderCount === 0) {
        throw new Error("配置文件中未找到任何代理");
      }

      const autoProxyGroupRegexs = [
        { name: "HK-自动选择", regex: /(港|hk|hong\s*kong|🇭🇰)/},
        { name: "TW-自动选择", regex: /(台|tw|taiwan|taipei|🇹🇼)/},
        { name: "SG-自动选择", regex: /(新|sg|singapore|狮城|🇸🇬)/},
        { name: "JP-自动选择", regex: /(日|jp|japan|东京|大阪|🇯🇵)/},
        { name: "US-自动选择", regex: /(美|us|united\s*states|america|atlanta|chicago|dallas|los\s*angeles|miami|new\s*york|seattle|silicon\s*valley|🇺🇸)/},
        { name: "KR-自动选择", regex: /(韩|kr|korea|seoul|🇰🇷)/},
        { name: "其他节点", regex: /.*/ },
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
          "proxies": ["延迟选优",...autoProxyGroups.map((item) => item.name),"故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
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
      overwriteDns(config)
      // 返回修改后的配置
      return config;
}

// 防止 dns 泄露
function overwriteDns (params) {
  const cnDnsList = [
      "https://223.5.5.5/dns-query",
      "https://1.12.12.12/dns-query",
  ];
  const trustDnsList = [
      'quic://dns.cooluc.com',
      "https://1.0.0.1/dns-query",
      "https://1.1.1.1/dns-query",
  ];

  const dnsOptions = {
      enable: true,
      "prefer-h3": true, // 如果 DNS 服务器支持 DoH3 会优先使用 h3
      "default-nameserver": cnDnsList, // 用于解析其他 DNS 服务器、和节点的域名，必须为 IP, 可为加密 DNS。注意这个只用来解析节点和其他的 dns，其他网络请求不归他管
      nameserver: trustDnsList, // 其他网络请求都归他管

      // 这个用于覆盖上面的 nameserver
      "nameserver-policy": {
          //[combinedUrls]: notionDns,
          "geosite:cn": cnDnsList,
          "geosite:geolocation-!cn": trustDnsList,
          // 如果你有一些内网使用的 DNS，应该定义在这里，多个域名用英文逗号分割
          // '+. 公司域名.com, www.4399.com, +.baidu.com': '10.0.0.1'
      },
      fallback: trustDnsList,
      "fallback-filter": {
          geoip: true,
          // 除了 geoip-code 配置的国家 IP, 其他的 IP 结果会被视为污染 geoip-code 配置的国家的结果会直接采用，否则将采用 fallback 结果
          "geoip-code": "CN",
          //geosite 列表的内容被视为已污染，匹配到 geosite 的域名，将只使用 fallback 解析，不去使用 nameserver
          geosite: ["gfw"],
          ipcidr: ["240.0.0.0/4"],
          domain: ["+.google.com", "+.facebook.com", "+.youtube.com"],
      },
  };

  // GitHub 加速前缀
  const githubPrefix = "https://fastgh.lainbo.com/";

  // GEO 数据 GitHub 资源原始下载地址
  const rawGeoxURLs = {
      geoip:
          "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat",
      geosite:
          "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
      mmdb: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb",
  };

  // 生成带有加速前缀的 GEO 数据资源对象
  const accelURLs = Object.fromEntries (
      Object.entries (rawGeoxURLs).map (([key, githubUrl]) => [
          key,
          `${githubPrefix}${githubUrl}`,
      ])
  );

  const otherOptions = {
      "unified-delay": true,
      "tcp-concurrent": true,
      profile: {
          "store-selected": true,
          "store-fake-ip": true,
      },
      sniffer: {
          enable: true,
          sniff: {
              TLS: {
                  ports: [443, 8443],
              },
              HTTP: {
                  ports: [80, "8080-8880"],
                  "override-destination": true,
              },
          },
      },
      "geodata-mode": true,
      "geox-url": accelURLs,
  };

  params.dns = { ...params.dns, ...dnsOptions };
  Object.keys (otherOptions).forEach ((key) => {
      params [key] = otherOptions [key];
  });
}
