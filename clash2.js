// Define the `main` function

const proxyName = "代理模式";

function main (params) {
    if (!params.proxies) return params;
    overwriteRules (params);
    overwriteProxyGroups (params);
    overwriteDns (params);
    return params;
}
// 覆写规则
function overwriteRules (params) {
    const customRules = [
      // 在此添加自定义规则，最高优先级。
      // 为了方便区分，可设置 全局代理模式 或 自定义代理组。
      // 示例 1 ：使用 全局代理模式
      //"DOMAIN-SUFFIX,linux.do," + proxyName,
      // 示例 2 ：使用 自定义代理组 1
      //"DOMAIN-SUFFIX,gstatic.com, 自定义代理组 1",
      // 示例 3 ：使用 自定义代理组 2
      //"DOMAIN-SUFFIX,googleapis.com, 自定义代理组 2",
        // 自定义规则
        "RULE-SET,unproxy,DIRECT",
        "RULE-SET,myproxy,"+ proxyName,
    ];


    const rules = [
        ...customRules,
        "RULE-SET,reject, 广告拦截",
        "RULE-SET,direct,DIRECT",
        "RULE-SET,cncidr,DIRECT",
        "RULE-SET,private,DIRECT",
        "RULE-SET,lancidr,DIRECT",
        "GEOIP,LAN,DIRECT,no-resolve",
        "GEOIP,CN,DIRECT,no-resolve",
        "RULE-SET,applications,DIRECT",

        "RULE-SET,ai,ai",
        "RULE-SET,crypto,加密",
        "RULE-SET,steamcn,DIRECT",
        "RULE-SET,apple,苹果服务",
        "RULE-SET,microsoft,微软服务",
      
        "RULE-SET,cnmedia,国内媒体",
        "RULE-SET,glbmedia,国外媒体",
      
        "RULE-SET,tld-not-cn," + proxyName,

        "RULE-SET,gfw," + proxyName,
        "RULE-SET,greatfire," + proxyName,
        "RULE-SET,proxy," + proxyName,
        "MATCH, 漏网之鱼",
    ];
    // 规则集通用配置
    const ruleProviderCommon = {
        "type": "http",
        // "format": "yaml",
        "interval": 86400
    };
    const ruleProviders = {
        unproxy: {behavior: "classical",url: "https://raw.githubusercontent.com/ninoleee/clash/refs/heads/main/UnProxy.yaml",path: "./ruleset2/own/UnProxy.yaml",...ruleProviderCommon,},
        myproxy: {behavior: "classical",url: "https://raw.githubusercontent.com/ninoleee/clash/refs/heads/main/MyProxy.yaml",path: "./ruleset2/own/MyProxy.yaml",...ruleProviderCommon,},
        reject: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
            path: "./ruleset/reject.yaml",
            interval: 86400,
        },

        steamcn: {behavior: "domain",format: "mrs",url: "https://github.com/DustinWin/ruleset_geodata/releases/download/clash-ruleset/games-cn.mrs",path: "./ruleset2/SteamCN.mrs",...ruleProviderCommon,},
        apple: {behavior: "classical",url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Apple/Apple_Classical_No_Resolve.yaml",path: "./ruleset2/blackmatrix7/Apple_Classical_No_Resolve.yaml",...ruleProviderCommon,},
        microsoft: {behavior: "classical",url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Microsoft/Microsoft_No_Resolve.yaml",path: "./ruleset2/blackmatrix7/Microsoft_No_Resolve.yaml",...ruleProviderCommon,},
        cnmedia: {behavior: "classical",url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_No_Resolve.yaml",path: "./ruleset2/blackmatrix7/ChinaMedia_No_Resolve.yaml",...ruleProviderCommon,},

        proxy: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
            path: "./ruleset/proxy.yaml",
            interval: 86400,
        },
        crypto: {behavior: "classical",url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Crypto/Crypto.yaml",path: "./ruleset2/blackmatrix7/Crypto.yaml",...ruleProviderCommon,},
        ai: {behavior: "domain",format: "mrs",url: "https://github.com/DustinWin/ruleset_geodata/releases/download/clash-ruleset/ai.mrs",path: "./ruleset2/ai.mrs",...ruleProviderCommon,},
        glbmedia: {behavior: "classical",url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/GlobalMedia/GlobalMedia_Classical_No_Resolve.yaml",path: "./ruleset2/blackmatrix7/GlobalMedia_Classical_No_Resolve.yaml",...ruleProviderCommon,},

        direct: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
            path: "./ruleset/direct.yaml",
            interval: 86400,
        },
        private: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
            path: "./ruleset/private.yaml",
            interval: 86400,
        },
        gfw: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
            path: "./ruleset/gfw.yaml",
            interval: 86400,
        },
        greatfire: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/greatfire.txt",
            path: "./ruleset/greatfire.yaml",
            interval: 86400,
        },
        "tld-not-cn": {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
            path: "./ruleset/tld-not-cn.yaml",
            interval: 86400,
        },
        telegramcidr: {
            type: "http",
            behavior: "ipcidr",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
            path: "./ruleset/telegramcidr.yaml",
            interval: 86400,
        },
        cncidr: {
            type: "http",
            behavior: "ipcidr",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
            path: "./ruleset/cncidr.yaml",
            interval: 86400,
        },
        lancidr: {
            type: "http",
            behavior: "ipcidr",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
            path: "./ruleset/lancidr.yaml",
            interval: 86400,
        },
        applications: {
            type: "http",
            behavior: "classical",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
            path: "./ruleset/applications.yaml",
            interval: 86400,
        },
    };
    params ["rule-providers"] = ruleProviders;
    params ["rules"] = rules;
}
// 覆写代理组
function overwriteProxyGroups (config) {
    // 添加自用代理
    params.proxies.push (
        //  { name: '1 - 香港 - 示例 ', type: *, server: **, port: *, cipher: **, password: **, udp: true }
    );

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

function getProxiesByRegex (params, regex) {
    const matchedProxies = params.proxies.filter ((e) => regex.test (e.name)).map ((e) => e.name);
    return matchedProxies.length > 0 ? matchedProxies : ["手动选择"];
}

function getManualProxiesByRegex (params, regex) {
    const matchedProxies = params.proxies.filter ((e) => regex.test (e.name)).map ((e) => e.name);
    return matchedProxies.length > 0 ? matchedProxies : ["DIRECT", "手动选择", proxyName];
}