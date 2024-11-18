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

      "DOMAIN-SUFFIX,linux.do,Linux Do",
      "DOMAIN-SUFFIX,shared.oaifree.com,Shared Chat",
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
        "RULE-SET,openai,ChatGPT",
        "RULE-SET,claude,Claude",
        "RULE-SET,spotify,Spotify",
        "RULE-SET,telegramcidr,电报消息,no-resolve",
        "RULE-SET,tld-not-cn," + proxyName,
        "RULE-SET,google," + proxyName,
        "RULE-SET,icloud," + proxyName,
        "RULE-SET,apple," + proxyName,
        "RULE-SET,gfw," + proxyName,
        "RULE-SET,greatfire," + proxyName,
        "RULE-SET,proxy," + proxyName,
        "MATCH, 漏网之鱼",
    ];
    const ruleProviders = {
        reject: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
            path: "./ruleset/reject.yaml",
            interval: 86400,
        },
        icloud: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
            path: "./ruleset/icloud.yaml",
            interval: 86400,
        },
        apple: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
            path: "./ruleset/apple.yaml",
            interval: 86400,
        },
        google: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
            path: "./ruleset/google.yaml",
            interval: 86400,
        },
        proxy: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
            path: "./ruleset/proxy.yaml",
            interval: 86400,
        },
        openai: {
            type: "http",
            behavior: "classical",
            url: "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml",
            path: "./ruleset/custom/openai.yaml"
        },
        claude: {
            type: "http",
            behavior: "classical",
            url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Claude/Claude.yaml",
            path: "./ruleset/custom/Claude.yaml"
        },
        spotify: {
            type: "http",
            behavior: "classical",
            url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.yaml",
            path: "./ruleset/custom/Spotify.yaml"
        },
        telegramcidr: {
            type: "http",
            behavior: "ipcidr",
            url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
            path: "./ruleset/custom/telegramcidr.yaml"
        },
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
function overwriteProxyGroups (params) {
    // 添加自用代理
    params.proxies.push (
        //  { name: '1 - 香港 - 示例 ', type: *, server: **, port: *, cipher: **, password: **, udp: true }

    );

    // 所有代理
    const allProxies = params ["proxies"].map ((e) => e.name);
    // 自动选择代理组，按地区分组选延迟最低
    const autoProxyGroupRegexs = [
        { name: "HK - 自动选择", regex: /香港|HK|Hong|🇭🇰/ },
        { name: "TW - 自动选择", regex: /台湾|TW|Taiwan|Wan|🇹🇼/ },
        { name: "SG - 自动选择", regex: /新加坡|狮城 |SG|Singapore|🇸🇬/ },
        { name: "JP - 自动选择", regex: /日本|JP|Japan|🇯🇵/ },
        { name: "US - 自动选择", regex: /美国|US|United States|America|🇺🇸/ },
        { name: "DE - 自动选择", regex: /德国|DE|Germany|🇩🇪/ },
        { name: "RU - 自动选择", regex: /俄罗斯|RU|Russia|🇷🇺/ },
        { name: "KR - 自动选择", regex: /韩国|KR|Korea|🇰🇷/},       
	      { name: "UK - 自动选择", regex: /英国|UK|United Kingdom|Britain|🇬🇧/},
        { name: "CA - 自动选择", regex: /加拿大|CA|Canada|🇨🇦/ },
        { name: "AU - 自动选择", regex: /澳大利亚|AU|Australia|🇦🇺/ },
        { name: "FR - 自动选择", regex: /法国|FR|France|🇫🇷/ },
        { name: "NL - 自动选择", regex: /荷兰|NL|Netherlands|🇳🇱/ },
        { name: "CN - 自动选择", regex: /中国|CN|China|🇨🇳/ },
        { name: "其它 - 自动选择", regex: /(?!.*(?: 剩余 | 到期 | 主页 | 官网 | 游戏 | 关注))(.*)/ },
    ];

    const autoProxyGroups = autoProxyGroupRegexs
        .map ((item) => ({
            name: item.name,
            type: "url-test",
            url: "http://www.gstatic.com/generate_204",
            interval: 300,
            tolerance: 50,
            proxies: getProxiesByRegex (params, item.regex),
            hidden: true,
        }))
        .filter ((item) => item.proxies.length > 0);

    // 手工选择代理组
    const manualProxyGroups = [
        { name: "HK - 手工选择", regex: /香港|HK|Hong|🇭🇰/, icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg" },
        { name: "TW - 手工选择", regex: /台湾|TW|Taiwan|Wan|🇹🇼/, icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/tw.svg" },
        { name: "SG - 手工选择", regex: /新加坡|狮城 |SG|Singapore|🇸🇬/, icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/sg.svg" },
        { name: "JP - 手工选择", regex: /日本|JP|Japan|🇯🇵/, icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/jp.svg" },
        { name: "US - 手工选择", regex: /美国|US|United States|America|🇺🇸/, icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/us.svg" },
        { name: "DE - 手工选择", regex: /德国|DE|Germany|🇩🇪/, icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/de.svg" },
        { name: "RU - 手工选择", regex: /俄罗斯|RU|Russia|🇷🇺/, icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ru.svg" },
        { name: "KR - 手工选择", regex: /韩国|KR|Korea|🇰🇷/, icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/kr.svg" },
        { name: "UK - 手工选择", regex: /英国|UK|United Kingdom|Britain|🇬🇧/, icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/gb.svg" },    	
        { name: "CA - 手工选择", regex: /加拿大|CA|Canada|🇨🇦/, icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ca.svg" },
	      { name: "AU - 手工选择", regex: /澳大利亚|AU|Australia|🇦🇺/, icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/au.svg" },
	      { name: "FR - 手工选择", regex: /法国|FR|France|🇫🇷/, icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/fr.svg" },
	      { name: "NL - 手工选择", regex: /荷兰|NL|Netherlands|🇳🇱/, icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/nl.svg" },
        { name: "CN - 手工选择", regex: /中国|CN|China|🇨🇳/, icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/cn.svg" },
    ];

    const manualProxyGroupsConfig = manualProxyGroups
        .map ((item) => ({
            name: item.name,
            type: "select",
            proxies: getManualProxiesByRegex (params, item.regex),
            icon: item.icon,
            hidden: false,
        }))
        .filter ((item) => item.proxies.length > 0);

    const groups = [
        {
            name: proxyName,
            type: "select",
            url: "http://www.gstatic.com/generate_204",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
            proxies: [
                "自动选择",
                "手动选择",
                "负载均衡 (散列)",
                "负载均衡 (轮询)",
                "DIRECT",
            ],
        },
        {
            name: "手动选择",
            type: "select",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg",
            proxies: allProxies,
        },
        {
            name: "自动选择",
            type: "select",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg",
            proxies: ["ALL - 自动选择"],
        },
        {
            name: "负载均衡 (散列)",
            type: "load-balance",
            url: "http://www.gstatic.com/generate_204",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg",
            interval: 300,
            "max-failed-times": 3,
            strategy: "consistent-hashing",
            lazy: true,
            proxies: allProxies,
        },
        {
            name: "负载均衡 (轮询)",
            type: "load-balance",
            url: "http://www.gstatic.com/generate_204",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg",
            interval: 300,
            "max-failed-times": 3,
            strategy: "round-robin",
            lazy: true,
            proxies: allProxies,
        },
        {
            name: "ALL - 自动选择",
            type: "url-test",
            url: "http://www.gstatic.com/generate_204",
            interval: 300,
            tolerance: 50,
            proxies: allProxies,
            hidden: true,
        },
        {
            name: "自定义代理组 1",
            type: "select",
	          proxies: [proxyName, "HK - 自动选择", "HK - 手工选择", "TW - 自动选择", "TW - 手工选择", "SG - 自动选择", "SG - 手工选择", "JP - 自动选择", "JP - 手工选择", "US - 自动选择", "US - 手工选择", "DE - 自动选择", "DE - 手工选择", "RU - 自动选择", "RU - 手工选择", "KR - 自动选择", "KR - 手工选择", "UK - 自动选择", "UK - 手工选择", "CA - 自动选择", "CA - 手工选择", "AU - 自动选择", "AU - 手工选择", "FR - 自动选择", "FR - 手工选择", "NL - 自动选择", "NL - 手工选择", "CN - 自动选择", "CN - 手工选择", "其它 - 自动选择"],
            "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
        },
        {
            name: "自定义代理组 2",
            type: "select",
	          proxies: [proxyName, "HK - 自动选择", "HK - 手工选择", "TW - 自动选择", "TW - 手工选择", "SG - 自动选择", "SG - 手工选择", "JP - 自动选择", "JP - 手工选择", "US - 自动选择", "US - 手工选择", "DE - 自动选择", "DE - 手工选择", "RU - 自动选择", "RU - 手工选择", "KR - 自动选择", "KR - 手工选择", "UK - 自动选择", "UK - 手工选择", "CA - 自动选择", "CA - 手工选择", "AU - 自动选择", "AU - 手工选择", "FR - 自动选择", "FR - 手工选择", "NL - 自动选择", "NL - 手工选择", "CN - 自动选择", "CN - 手工选择", "其它 - 自动选择"],
            "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
        },
        {
            name: "电报消息",
            type: "select",
	          proxies: [proxyName, "HK - 自动选择", "HK - 手工选择", "TW - 自动选择", "TW - 手工选择", "SG - 自动选择", "SG - 手工选择", "JP - 自动选择", "JP - 手工选择", "US - 自动选择", "US - 手工选择", "DE - 自动选择", "DE - 手工选择", "RU - 自动选择", "RU - 手工选择", "KR - 自动选择", "KR - 手工选择", "UK - 自动选择", "UK - 手工选择", "CA - 自动选择", "CA - 手工选择", "AU - 自动选择", "AU - 手工选择", "FR - 自动选择", "FR - 手工选择", "NL - 自动选择", "NL - 手工选择", "CN - 自动选择", "CN - 手工选择", "其它 - 自动选择"],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
        },
        {
            name: "ChatGPT",
            type: "select",
	          proxies: [proxyName, "HK - 自动选择", "HK - 手工选择", "TW - 自动选择", "TW - 手工选择", "SG - 自动选择", "SG - 手工选择", "JP - 自动选择", "JP - 手工选择", "US - 自动选择", "US - 手工选择", "DE - 自动选择", "DE - 手工选择", "RU - 自动选择", "RU - 手工选择", "KR - 自动选择", "KR - 手工选择", "UK - 自动选择", "UK - 手工选择", "CA - 自动选择", "CA - 手工选择", "AU - 自动选择", "AU - 手工选择", "FR - 自动选择", "FR - 手工选择", "NL - 自动选择", "NL - 手工选择", "CN - 自动选择", "CN - 手工选择", "其它 - 自动选择"],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg"
        },
        {
            name: "Claude",
            type: "select",
	          proxies: [proxyName, "HK - 自动选择", "HK - 手工选择", "TW - 自动选择", "TW - 手工选择", "SG - 自动选择", "SG - 手工选择", "JP - 自动选择", "JP - 手工选择", "US - 自动选择", "US - 手工选择", "DE - 自动选择", "DE - 手工选择", "RU - 自动选择", "RU - 手工选择", "KR - 自动选择", "KR - 手工选择", "UK - 自动选择", "UK - 手工选择", "CA - 自动选择", "CA - 手工选择", "AU - 自动选择", "AU - 手工选择", "FR - 自动选择", "FR - 手工选择", "NL - 自动选择", "NL - 手工选择", "CN - 自动选择", "CN - 手工选择", "其它 - 自动选择"],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/claude.svg"
        },
        {
            name: "Spotify",
            type: "select",
	          proxies: [proxyName, "HK - 自动选择", "HK - 手工选择", "TW - 自动选择", "TW - 手工选择", "SG - 自动选择", "SG - 手工选择", "JP - 自动选择", "JP - 手工选择", "US - 自动选择", "US - 手工选择", "DE - 自动选择", "DE - 手工选择", "RU - 自动选择", "RU - 手工选择", "KR - 自动选择", "KR - 手工选择", "UK - 自动选择", "UK - 手工选择", "CA - 自动选择", "CA - 手工选择", "AU - 自动选择", "AU - 手工选择", "FR - 自动选择", "FR - 手工选择", "NL - 自动选择", "NL - 手工选择", "CN - 自动选择", "CN - 手工选择", "其它 - 自动选择"],
            // "include-all": true,
            icon: "https://storage.googleapis.com/spotifynewsroom-jp.appspot.com/1/2020/12/Spotify_Icon_CMYK_Green.png"
        },
        {
            name: "漏网之鱼",
            type: "select",
            proxies: ["DIRECT", proxyName],
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
        },
        {
            name: "广告拦截",
            type: "select",
            proxies: ["REJECT", "DIRECT", proxyName],
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg"
        },
    ];

    const linuxDoGroup = {
        name: "Linux Do",
        type: "url-test",
        url: "https://linux.do/",
        interval: 300,
        tolerance: 50,
        proxies: allProxies,
        icon: "https://linux.do/uploads/default/original/3X/9/d/9dd49731091ce8656e94433a26a3ef36062b3994.png"
    };

    const sharedChatGroup = {
        name: "Shared Chat",
        type: "select",
        proxies: ["CN - 自动选择", "CN - 手工选择", "HK - 自动选择", "HK - 手工选择", "TW - 自动选择", "TW - 手工选择"],
        icon: "https://linux.do/user_avatar/linux.do/neo/144/12_2.png"
    };

    groups.push(sharedChatGroup);
    groups.push(linuxDoGroup);
    autoProxyGroups.length &&
        groups [2].proxies.unshift (...autoProxyGroups.map ((item) => item.name));
    groups.push (...autoProxyGroups);
    groups.push (...manualProxyGroupsConfig);
    params ["proxy-groups"] = groups;

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

function getManualProxiesByRegex(params, regex) {
    const matchedProxies = params.proxies.filter((e) => regex.test(e.name)).map((e) => e.name);
    // 如果是 CN 组，则始终包含 DIRECT，否则根据匹配结果决定是否包含 DIRECT
    return regex.test("CN") ? ["DIRECT", ...matchedProxies, "手动选择", proxyName] : (matchedProxies.length > 0 ? matchedProxies : ["DIRECT", "手动选择", proxyName]); 
}