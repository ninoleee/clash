const ENABLE_IPV6 = true;
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


// ==================================================
// Rule Provider 通用配置
// ==================================================

const ruleProviderCommon = {
  type: "http",
  interval: 86400,
};


// ==================================================
// Rule Providers
// ==================================================

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


// ==================================================
// 分流规则
//
// 本版顺序：
// 1. 本地程序、私有网络
// 2. 自定义强制代理
// 3. 自定义强制直连
// 4. AI/Cursor
// 5. Apple、Microsoft
// 6. 广告
// 7. 其他分类
// 8. 国外代理
// 9. 国内直连
// 10. MATCH
// ==================================================

const rules = [
  // ------------------------------------------------
  // 本地程序和私有网络
  // ------------------------------------------------

  "RULE-SET,applications,DIRECT",
  "RULE-SET,private,DIRECT",

  // ------------------------------------------------
  // 自定义规则
  //
  // myproxy 优先于 unproxy。
  // 如果同一条规则同时出现在两份文件中，优先代理。
  // ------------------------------------------------

  `RULE-SET,myproxy,${proxyName}`,
  "RULE-SET,unproxy,DIRECT",

  // ------------------------------------------------
  // OpenAI / ChatGPT 保险规则
  //
  // 放在宽泛规则和广告规则之前。
  // ------------------------------------------------

  `DOMAIN-SUFFIX,openai.com,${GROUPS.ai}`,
  `DOMAIN-SUFFIX,chatgpt.com,${GROUPS.ai}`,
  `DOMAIN-SUFFIX,oaistatic.com,${GROUPS.ai}`,
  `DOMAIN-SUFFIX,oaiusercontent.com,${GROUPS.ai}`,
  `DOMAIN-SUFFIX,auth0.openai.com,${GROUPS.ai}`,

  // ------------------------------------------------
  // Cursor
  // ------------------------------------------------

  `DOMAIN-SUFFIX,cursor-cdn.com,${GROUPS.ai}`,
  `DOMAIN-SUFFIX,cursor.com,${GROUPS.ai}`,
  `DOMAIN-SUFFIX,cursor.sh,${GROUPS.ai}`,
  `DOMAIN-SUFFIX,cursorapi.com,${GROUPS.ai}`,

  // ------------------------------------------------
  // AI 规则集
  // ------------------------------------------------

  `RULE-SET,ai,${GROUPS.ai}`,

  // ------------------------------------------------
  // Apple、Microsoft
  //
  // 放在广告规则之前，降低登录、推送、系统更新和
  // 云同步等必要资源被广告规则误杀的概率。
  // ------------------------------------------------

  `RULE-SET,apple,${GROUPS.apple}`,
  `RULE-SET,microsoft,${GROUPS.microsoft}`,

  // ------------------------------------------------
  // 广告拦截
  // ------------------------------------------------

  `RULE-SET,reject,${GROUPS.reject}`,

  // ------------------------------------------------
  // 其他分类服务
  // ------------------------------------------------

  `RULE-SET,crypto,${GROUPS.crypto}`,
  "RULE-SET,steamcn,DIRECT",
  `RULE-SET,cnmedia,${GROUPS.cnMedia}`,
  `RULE-SET,glbmedia,${GROUPS.globalMedia}`,

  // ------------------------------------------------
  // 国外域名
  // ------------------------------------------------

  `RULE-SET,proxy,${proxyName}`,

  // ------------------------------------------------
  // 国内域名和 IP
  // ------------------------------------------------

  "RULE-SET,cnmax_nomedia,DIRECT",
  "RULE-SET,cnip,DIRECT,no-resolve",

  // cnip.mrs 已处理中国大陆 IPv4/IPv6，
  // 因此不再使用重复的 GEOIP,CN。

  // ------------------------------------------------
  // 最终规则
  // ------------------------------------------------

  `MATCH,${GROUPS.final}`,
];


// ==================================================
// 健康检查通用配置
// ==================================================

const healthCheckOptions = {
  url: HEALTH_CHECK_URL,
  interval: 600,
  timeout: 5000,
  lazy: true,
  "max-failed-times": 3,
  "expected-status": 204,
};


// ==================================================
// 地区自动分组
// ==================================================

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
  .map(({ filter }) =>
    filter
      .replace(/^\(\?i\)/, "")
      .replace(/^\(|\)$/g, ""),
  )
  .join("|");


// ==================================================
// 创建地区组
// ==================================================

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

    "exclude-filter": `(?i)(${knownRegionFilter}|${NODE_EXCLUDE_FILTER.replace(
      /^\(\?i\)\(|\)$/g,
      "",
    )})`,

    hidden: true,
  });

  return regionGroups;
}


// ==================================================
// 创建 Select 策略组
// ==================================================

function createSelectGroup(name, proxies, icon) {
  return {
    name,
    type: "select",
    proxies,
    icon,
  };
}


// ==================================================
// 添加额外 Proxy Providers
// ==================================================

function addCustomProxyProviders(config) {
  // 在这里填写额外订阅。
  // 留空时使用原配置已有的 proxy-providers。
  //
  // 不要将真实订阅地址提交到公共仓库。

  const subscriptionUrls = [
    // "https://example.com/subscription.yaml",
  ];

  subscriptionUrls
    .filter(
      (url) =>
        typeof url === "string" &&
        url.trim().length > 0,
    )
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


// ==================================================
// 创建策略组
// ==================================================

function buildProxyGroups() {
  const autoProxyGroups = createRegionGroups();

  const autoProxyGroupNames = autoProxyGroups.map(
    ({ name }) => name,
  );

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
    // ------------------------------------------------
    // 主节点组
    // ------------------------------------------------

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

    // ------------------------------------------------
    // 手动节点
    // ------------------------------------------------

    {
      name: GROUPS.manual,
      type: "select",

      "include-all": true,
      "exclude-filter": NODE_EXCLUDE_FILTER,

      icon: "https://fastly.jsdelivr.net/gh/shindgewongxj/WHATSINStash@master/icon/select.png",
    },

    // ------------------------------------------------
    // 延迟选优
    // ------------------------------------------------

    {
      ...healthCheckOptions,

      name: GROUPS.latency,
      type: "url-test",

      tolerance: 100,

      "include-all": true,
      "exclude-filter": NODE_EXCLUDE_FILTER,

      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg",
    },

    // ------------------------------------------------
    // 地区自动组
    // ------------------------------------------------

    ...autoProxyGroups,

    // ------------------------------------------------
    // 故障转移
    // ------------------------------------------------

    {
      ...healthCheckOptions,

      name: GROUPS.fallback,
      type: "fallback",

      "include-all": true,
      "exclude-filter": NODE_EXCLUDE_FILTER,

      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg",
    },

    // ------------------------------------------------
    // 负载均衡
    // ------------------------------------------------

    {
      ...healthCheckOptions,

      name: GROUPS.loadBalance,
      type: "load-balance",

      strategy: "consistent-hashing",

      "include-all": true,
      "exclude-filter": NODE_EXCLUDE_FILTER,

      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg",
    },

    // ------------------------------------------------
    // AI
    // ------------------------------------------------

    createSelectGroup(
      GROUPS.ai,
      proxyChoices,
      "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/AI.png",
    ),

    // ------------------------------------------------
    // 加密货币
    // ------------------------------------------------

    createSelectGroup(
      GROUPS.crypto,
      proxyChoices,
      "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Cryptocurrency_3.png",
    ),

    // ------------------------------------------------
    // 国内媒体
    // ------------------------------------------------

    createSelectGroup(
      GROUPS.cnMedia,
      directFirstChoices,
      "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/bilibili.png",
    ),

    // ------------------------------------------------
    // 国外媒体
    // ------------------------------------------------

    createSelectGroup(
      GROUPS.globalMedia,
      proxyChoices,
      "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg",
    ),

    // ------------------------------------------------
    // Microsoft
    // ------------------------------------------------

    createSelectGroup(
      GROUPS.microsoft,
      directFirstChoices,
      "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg",
    ),

    // ------------------------------------------------
    // Apple
    // ------------------------------------------------

    createSelectGroup(
      GROUPS.apple,
      directFirstChoices,
      "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg",
    ),

    // ------------------------------------------------
    // 广告拦截
    // ------------------------------------------------

    createSelectGroup(
      GROUPS.reject,

      [
        "REJECT",
        "DIRECT",
      ],

      "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg",
    ),

    // ------------------------------------------------
    // 漏网之鱼
    // ------------------------------------------------

    createSelectGroup(
      GROUPS.final,
      proxyChoices,
      "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg",
    ),
  ];
}


// ==================================================
// 覆写 DNS、嗅探和全局选项
// ==================================================

function overwriteDns(config) {
  // ------------------------------------------------
  // 明确开启全局 IPv6
  // ------------------------------------------------

  config.ipv6 = ENABLE_IPV6;

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

    // 明确开启 DNS IPv6/AAAA 查询
    ipv6: ENABLE_IPV6,

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

    "default-nameserver": [
      "223.5.5.5",
      "1.12.12.12",
    ],

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

  // Policy 模式不再保留 fallback。
  delete config.dns.fallback;
  delete config.dns["fallback-filter"];

  config["unified-delay"] = true;
  config["tcp-concurrent"] = true;

  config.profile = {
    ...(config.profile ?? {}),

    "store-selected": true,
    "store-fake-ip": true,
  };

  // ------------------------------------------------
  // 嗅探
  // ------------------------------------------------

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

    "skip-domain": [
      "Mijia Cloud",
      "+.push.apple.com",
    ],
  };

  // ------------------------------------------------
  // GeoData
  //
  // GEOIP,CN 已删除，因此不再下载 geoip-lite.dat。
  // DNS nameserver-policy 仍使用 geosite，所以保留 geosite.dat。
  // ------------------------------------------------

  config["geodata-mode"] = true;
  config["geo-auto-update"] = true;
  config["geo-update-interval"] = 24;

  config["geox-url"] = {
    geosite:
      "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
  };
}


// ==================================================
// 主入口
// ==================================================

function main(config) {
  if (!config || typeof config !== "object") {
    throw new TypeError("传入的配置必须是对象");
  }

  // ------------------------------------------------
  // 初始化并验证 proxies
  // ------------------------------------------------

  config.proxies ??= [];

  if (!Array.isArray(config.proxies)) {
    throw new TypeError("config.proxies 必须是数组");
  }

  // ------------------------------------------------
  // 初始化并验证 proxy-providers
  // ------------------------------------------------

  config["proxy-providers"] ??= {};

  if (
    typeof config["proxy-providers"] !== "object" ||
    Array.isArray(config["proxy-providers"])
  ) {
    throw new TypeError(
      'config["proxy-providers"] 必须是对象',
    );
  }

  // ------------------------------------------------
  // 可选：在此添加个人自用节点
  //
  // 不要将真实密码或订阅地址提交到公共仓库。
  // ------------------------------------------------

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

  // ------------------------------------------------
  // 添加额外订阅
  // ------------------------------------------------

  addCustomProxyProviders(config);

  // ------------------------------------------------
  // 检查是否至少存在一个节点来源
  // ------------------------------------------------

  const proxyCount = config.proxies.length;

  const proxyProviderCount = Object.keys(
    config["proxy-providers"],
  ).length;

  if (
    proxyCount === 0 &&
    proxyProviderCount === 0
  ) {
    throw new Error(
      "配置文件中未找到任何代理或代理订阅",
    );
  }

  // ------------------------------------------------
  // 完整覆写策略组、规则提供者和规则
  // ------------------------------------------------

  config["proxy-groups"] = buildProxyGroups();
  config["rule-providers"] = ruleProviders;
  config.rules = rules;

  // ------------------------------------------------
  // 覆写 DNS、IPv6、嗅探和 GeoData
  // ------------------------------------------------

  overwriteDns(config);

  return config;
}
