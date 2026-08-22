const proxyName = "节点选择";

const GROUPS = {
  manual: "手动节点",
  latency: "延迟选优",
  fallback: "故障转移",
  loadBalance: "负载均衡(散列)",
  ai: "ai",
  crypto: "加密",
  cnMedia: "国内媒体",
  globalMedia: "国外媒体",
  microsoft: "微软服务",
  apple: "苹果服务",
  reject: "全局拦截",
  final: "漏网之鱼",
};

const HEALTH_CHECK_URL = "https://www.gstatic.com/generate_204";
const NODE_EXCLUDE_FILTER =
  "(?i)(剩余流量|流量剩余|套餐到期|到期时间|过期时间|官网|用户群|订阅|重置|traffic|expire)";

// 规则集通用配置
const ruleProviderCommon = {
  type: "http",
  interval: 86400,
};

const ruleProviders = {
  unproxy: {
    ...ruleProviderCommon,
    behavior: "classical",
    format: "yaml",
    url: "https://raw.githubusercontent.com/ninoleee/clash/refs/heads/main/UnProxy.yaml",
    path: "./ruleset2/own/UnProxy.yaml",
  },
  applications: {
    ...ruleProviderCommon,
    behavior: "classical",
    format: "text",
    url: "https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/applications.list",
    path: "./ruleset2/applications.list",
  },
  private: {
    ...ruleProviderCommon,
    behavior: "domain",
    format: "mrs",
    url: "https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/private.mrs",
    path: "./ruleset2/private.mrs",
  },
  steamcn: {
    ...ruleProviderCommon,
    behavior: "domain",
    format: "mrs",
    url: "https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/games-cn.mrs",
    path: "./ruleset2/games-cn.mrs",
  },
  apple: {
    ...ruleProviderCommon,
    behavior: "classical",
    format: "yaml",
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Apple/Apple_Classical_No_Resolve.yaml",
    path: "./ruleset2/blackmatrix7/Apple_Classical_No_Resolve.yaml",
  },
  microsoft: {
    ...ruleProviderCommon,
    behavior: "classical",
    format: "yaml",
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Microsoft/Microsoft_No_Resolve.yaml",
    path: "./ruleset2/blackmatrix7/Microsoft_No_Resolve.yaml",
  },
  cnmedia: {
    ...ruleProviderCommon,
    behavior: "classical",
    format: "yaml",
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_No_Resolve.yaml",
    path: "./ruleset2/blackmatrix7/ChinaMedia_No_Resolve.yaml",
  },
  cnmax_nomedia: {
    ...ruleProviderCommon,
    behavior: "domain",
    format: "mrs",
    url: "https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/cn.mrs",
    path: "./ruleset2/cn.mrs",
  },
  cnip: {
    ...ruleProviderCommon,
    behavior: "ipcidr",
    format: "mrs",
    url: "https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/cnip.mrs",
    path: "./ruleset2/cnip.mrs",
  },
  myproxy: {
    ...ruleProviderCommon,
    behavior: "classical",
    format: "yaml",
    url: "https://raw.githubusercontent.com/ninoleee/clash/refs/heads/main/MyProxy.yaml",
    path: "./ruleset2/own/MyProxy.yaml",
  },
  crypto: {
    ...ruleProviderCommon,
    behavior: "classical",
    format: "yaml",
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Crypto/Crypto.yaml",
    path: "./ruleset2/blackmatrix7/Crypto.yaml",
  },
  ai: {
    ...ruleProviderCommon,
    behavior: "domain",
    format: "mrs",
    url: "https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/ai.mrs",
    path: "./ruleset2/ai.mrs",
  },
  glbmedia: {
    ...ruleProviderCommon,
    behavior: "classical",
    format: "yaml",
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/GlobalMedia/GlobalMedia_Classical_No_Resolve.yaml",
    path: "./ruleset2/blackmatrix7/GlobalMedia_Classical_No_Resolve.yaml",
  },
  proxy: {
    ...ruleProviderCommon,
    behavior: "domain",
    format: "mrs",
    url: "https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/proxy.mrs",
    path: "./ruleset2/proxy.mrs",
  },
  reject: {
    ...ruleProviderCommon,
    behavior: "domain",
    format: "mrs",
    url: "https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/ads.mrs",
    path: "./ruleset2/reject.mrs",
  },
};

// 规则按从上到下的顺序匹配。
const rules = [
  // 广告拦截优先；如需允许某个误杀域名，请把对应 DOMAIN 规则放到此规则之前。
  `RULE-SET,reject,${GROUPS.reject}`,

  // 自定义规则
  "RULE-SET,unproxy,DIRECT",
  `RULE-SET,myproxy,${proxyName}`,

  // 本地程序和私有网络
  "RULE-SET,applications,DIRECT",
  "RULE-SET,private,DIRECT",

  // Cursor 必须放在宽泛的 proxy 规则之前。
  `DOMAIN-SUFFIX,cursor-cdn.com,${GROUPS.ai}`,
  `DOMAIN-SUFFIX,cursor.com,${GROUPS.ai}`,
  `DOMAIN-SUFFIX,cursor.sh,${GROUPS.ai}`,
  `DOMAIN-SUFFIX,cursorapi.com,${GROUPS.ai}`,

  // 分类服务
  `RULE-SET,ai,${GROUPS.ai}`,
  `RULE-SET,crypto,${GROUPS.crypto}`,
  "RULE-SET,steamcn,DIRECT",
  `RULE-SET,apple,${GROUPS.apple}`,
  `RULE-SET,microsoft,${GROUPS.microsoft}`,
  `RULE-SET,cnmedia,${GROUPS.cnMedia}`,
  `RULE-SET,glbmedia,${GROUPS.globalMedia}`,

  // 国外域名
  `RULE-SET,proxy,${proxyName}`,

  // 国内域名和 IP
  "RULE-SET,cnmax_nomedia,DIRECT",
  "RULE-SET,cnip,DIRECT,no-resolve",
  "GEOIP,CN,DIRECT,no-resolve",

  `MATCH,${GROUPS.final}`,
];

const healthCheckOptions = {
  url: HEALTH_CHECK_URL,
  interval: 600,
  timeout: 5000,
  lazy: true,
  "max-failed-times": 3,
  "expected-status": 204,
};

const regionGroupDefinitions = [
  {
    name: "HK-自动选择",
    filter: "(?i)(港|hk|hong\\s*kong|hongkong|🇭🇰)",
  },
  {
    name: "TW-自动选择",
    filter: "(?i)(台|tw|taiwan|taipei|🇹🇼)",
  },
  {
    name: "SG-自动选择",
    filter: "(?i)(新|sg|singapore|狮城|🇸🇬)",
  },
  {
    name: "JP-自动选择",
    filter: "(?i)(日|jp|japan|东京|大阪|🇯🇵)",
  },
  {
    name: "US-自动选择",
    filter:
      "(?i)(美|us|united\\s*states|america|atlanta|chicago|dallas|los\\s*angeles|miami|new\\s*york|seattle|silicon\\s*valley|🇺🇸)",
  },
  {
    name: "KR-自动选择",
    filter: "(?i)(韩|kr|korea|seoul|首尔|🇰🇷)",
  },
];

const knownRegionFilter = regionGroupDefinitions
  .map(({ filter }) => filter.replace(/^\(\?i\)/, "").replace(/^\(|\)$/g, ""))
  .join("|");

function createRegionGroups() {
  const regionGroups = regionGroupDefinitions.map(({ name, filter }) => ({
    ...healthCheckOptions,
    name,
    type: "url-test",
    tolerance: 50,
    "include-all": true,
    filter,
    "exclude-filter": NODE_EXCLUDE_FILTER,
    hidden: true,
  }));

  regionGroups.push({
    ...healthCheckOptions,
    name: "其他节点",
    type: "url-test",
    tolerance: 50,
    "include-all": true,
    "exclude-filter": `(?i)(${knownRegionFilter}|${NODE_EXCLUDE_FILTER.replace(/^\(\?i\)\(|\)$/g, "")})`,
    hidden: true,
  });

  return regionGroups;
}

function createSelectGroup(name, proxies, icon) {
  return {
    name,
    type: "select",
    proxies,
    icon,
  };
}

function addCustomProxyProviders(config) {
  // 在这里填写额外订阅。留空时使用原配置已有的 proxy-providers。
  const subscriptionUrls = [
    // "https://example.com/subscription.yaml",
  ];

  subscriptionUrls
    .filter((url) => typeof url === "string" && url.trim().length > 0)
    .forEach((url, index) => {
      const providerKey = `custom_provider_${index + 1}`;

      config["proxy-providers"][providerKey] = {
        type: "http",
        url: url.trim(),
        path: `./proxy_providers/${providerKey}.yaml`,
        interval: 3600,
        "health-check": {
          enable: true,
          url: HEALTH_CHECK_URL,
          interval: 600,
          timeout: 5000,
          lazy: true,
          "expected-status": 204,
        },
        override: {
          "additional-prefix": `[${providerKey}] `,
        },
      };
    });
}

function buildProxyGroups() {
  const autoProxyGroups = createRegionGroups();
  const autoProxyGroupNames = autoProxyGroups.map(({ name }) => name);

  const proxyChoices = [
    proxyName,
    GROUPS.latency,
    ...autoProxyGroupNames,
    GROUPS.fallback,
    GROUPS.loadBalance,
    "DIRECT",
  ];

  const directFirstChoices = [
    "DIRECT",
    proxyName,
    GROUPS.latency,
    ...autoProxyGroupNames,
    GROUPS.fallback,
    GROUPS.loadBalance,
  ];

  return [
    createSelectGroup(
      proxyName,
      [
        GROUPS.latency,
        ...autoProxyGroupNames,
        GROUPS.fallback,
        GROUPS.loadBalance,
        GROUPS.manual,
      ],
      "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
    ),
    {
      name: GROUPS.manual,
      type: "select",
      "include-all": true,
      "exclude-filter": NODE_EXCLUDE_FILTER,
      icon: "https://fastly.jsdelivr.net/gh/shindgewongxj/WHATSINStash@master/icon/select.png",
    },
    {
      ...healthCheckOptions,
      name: GROUPS.latency,
      type: "url-test",
      tolerance: 100,
      "include-all": true,
      "exclude-filter": NODE_EXCLUDE_FILTER,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg",
    },
    ...autoProxyGroups,
    {
      ...healthCheckOptions,
      name: GROUPS.fallback,
      type: "fallback",
      "include-all": true,
      "exclude-filter": NODE_EXCLUDE_FILTER,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg",
    },
    {
      ...healthCheckOptions,
      name: GROUPS.loadBalance,
      type: "load-balance",
      strategy: "consistent-hashing",
      "include-all": true,
      "exclude-filter": NODE_EXCLUDE_FILTER,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg",
    },
    createSelectGroup(
      GROUPS.ai,
      proxyChoices,
      "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/AI.png",
    ),
    createSelectGroup(
      GROUPS.crypto,
      proxyChoices,
      "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Cryptocurrency_3.png",
    ),
    createSelectGroup(
      GROUPS.cnMedia,
      directFirstChoices,
      "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/bilibili.png",
    ),
    createSelectGroup(
      GROUPS.globalMedia,
      proxyChoices,
      "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg",
    ),
    createSelectGroup(
      GROUPS.microsoft,
      directFirstChoices,
      "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg",
    ),
    createSelectGroup(
      GROUPS.apple,
      directFirstChoices,
      "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg",
    ),
    createSelectGroup(
      GROUPS.reject,
      ["REJECT", "DIRECT"],
      "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg",
    ),
    createSelectGroup(
      GROUPS.final,
      proxyChoices,
      "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg",
    ),
  ];
}

function overwriteDns(config) {
  const cnDnsList = [
    "https://223.5.5.5/dns-query",
    "https://1.12.12.12/dns-query",
  ];

  const trustedDnsList = [
    "https://1.1.1.1/dns-query",
    "https://1.0.0.1/dns-query",
  ];

  const dnsOptions = {
    enable: true,
    ipv6: config.dns?.ipv6 ?? false,
    "prefer-h3": false,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter-mode": "blacklist",
    "fake-ip-filter": [
      "*.lan",
      "*.local",
      "+.msftconnecttest.com",
      "+.msftncsi.com",
      "+.push.apple.com",
    ],
    "use-hosts": true,
    "use-system-hosts": true,
    "respect-rules": true,
    "default-nameserver": ["223.5.5.5", "1.12.12.12"],
    nameserver: cnDnsList,
    "nameserver-policy": {
      "geosite:private,cn": cnDnsList,
      "geosite:geolocation-!cn": trustedDnsList,
    },
    "proxy-server-nameserver": cnDnsList,
    "direct-nameserver": cnDnsList,
    "direct-nameserver-follow-policy": true,
  };

  config.dns = {
    ...(config.dns ?? {}),
    ...dnsOptions,
  };

  // policy 模式下不再保留与 nameserver 重复的 fallback 配置。
  delete config.dns.fallback;
  delete config.dns["fallback-filter"];

  config["unified-delay"] = true;
  config["tcp-concurrent"] = true;
  config.profile = {
    ...(config.profile ?? {}),
    "store-selected": true,
    "store-fake-ip": true,
  };

  config.sniffer = {
    enable: true,
    "force-dns-mapping": true,
    "parse-pure-ip": true,
    "override-destination": true,
    sniff: {
      TLS: {
        ports: [443, 8443],
      },
      HTTP: {
        ports: [80, "8080-8880"],
        "override-destination": true,
      },
      QUIC: {
        ports: [443, 8443],
      },
    },
    "skip-domain": ["Mijia Cloud", "+.push.apple.com"],
  };

  config["geodata-mode"] = true;
  config["geo-auto-update"] = true;
  config["geo-update-interval"] = 24;
  config["geox-url"] = {
    geoip:
      "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat",
    geosite:
      "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
  };
}

function main(config) {
  if (!config || typeof config !== "object") {
    throw new TypeError("传入的配置必须是对象");
  }

  config.proxies ??= [];
  if (!Array.isArray(config.proxies)) {
    throw new TypeError("config.proxies 必须是数组");
  }

  config["proxy-providers"] ??= {};
  if (
    typeof config["proxy-providers"] !== "object" ||
    Array.isArray(config["proxy-providers"])
  ) {
    throw new TypeError('config["proxy-providers"] 必须是对象');
  }

  // 在这里添加不会提交到公共仓库的自用节点；不要写入真实密码。
  const customProxies = [
    // {
    //   name: "private-node",
    //   type: "socks5",
    //   server: "127.0.0.1",
    //   port: 1080,
    //   username: "REPLACE_ME",
    //   password: "REPLACE_ME",
    //   udp: true,
    // },
  ];
  config.proxies.push(...customProxies);

  addCustomProxyProviders(config);

  const proxyCount = config.proxies.length;
  const proxyProviderCount = Object.keys(config["proxy-providers"]).length;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理或代理订阅");
  }

  config["proxy-groups"] = buildProxyGroups();
  config["rule-providers"] = ruleProviders;
  config.rules = rules;

  overwriteDns(config);
  return config;
}
