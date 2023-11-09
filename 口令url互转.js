/**
 * @author Aming
 * @description 🐒解析url口令互转
 * @origin 红灯区
 * @version v1.0.5
 * @name 口令url互转
 * @rule ^(jd|pz)jx([\s\S]+)$
 * @rule ^(code|口令)([\s\S]+)$
 * @priority 666
 * @admin true
 * @public false
 *
 * 说明：
      1、这是红灯区插件，基于红灯区插件进行的二开 （author Doraemon）
  
      2、触发示例
          解析jd口令：jdjx ?
          格式化膨胀：pzjx ?
          自动遮掩邀请人的PIN，只保留前1后1

          链接转口令：
            codehttps://
            口令https://

      3、设置一些变量
        url转口令服务地址（默认杂货铺接口）
          set Doraemon urlCodeConver_deCodeHost http://xxxx/JCommand
        
        口令转url
          类型 （1 默认 nolan服务地址  2 rabbit服务接口，默认 1）
            set Doraemon urlCodeConver_command_type 2

          如果选择类型2，需要设置 rabbit token，以及允许自定义服务地址（默认烟雨大佬反代地址/api/command）
            set Doraemon urlCodeConver_command_rabbitToken xxxxx
            set Doraemon urlCodeConver_command_Host http://xxxx
          
          如果选择类型1，无需设置，走红灯区默认api

  自定义：
    膨胀解析 默认格式化成bbk的助力格式CXJ_PZ_INVITE_CODES
    自定义变量名格式：
      set AmingScript PZexportName ?
    兔子：
      set AmingScript PZexportName PZ_CODE

  注意：
   1、简单测试可用
   2、无界超授可用
   3、自用插件

  ----------------------

  更新日志：
      v1.0.0 插件上线
      2023.8.14 v1.0.2 新增 功能：链接转东东口令
      2023.9.15 v1.0.3 优化 可自定义口令转换接口地址
      2023.11.9 v1.0.4 优化 url转口令 适配 rabbit公益服务 ip:port/api/genCode
      2023.11.9 v1.0.5 优化 口令转url 适配 rabbit公益服务 ip:port/api/command
 */

const Doraemon_tool = require('../自用插件/mod/Doraemon_tool');
/** Code Encryption Block[419fd178b7a37c9eae7b7426c4a04203568910d7e642299bd0f9c1d8a913051dc2973026bf4666873d87bf3f77f937e701da63c3299304f640c931940cef5606b7ca254a0c5542ad07f5b196899ff390bd1d6a9db234579526014e64329eab791c860ac422ee9db5cd627104002d666edfc0e542c0ed5bda67544c41ed2b547e4c5f0df6a5bba90b85136e2a57f33f574d0acbbbc82c273a34633c024f939c8fe98a048a2bee4979167bb729978cc390e6a8f502c83c584d39fb9441558e33c5cf17546e04230678c256d82460a87244f5d3286d41320f0a4ffc03425784e863ccc63a9eaf75c70919855c94c4e059a61071f6f7df381bc54a48003e6a57084f59d6a81b5de872783874b7302480cfb7c85dd772bfccda5002784cf7af90afca856d512a47930ce51ab32703a2de93c459186c9ab923c75c84ceaea692ce4b120806440c4f675ea61f0a28d52a65da1d342fa78dd2657ee237120ce4a1f1ce96dfeb48950dfcc43586e8593c0544cbee67408eafd8ee505f33fb635f0447289dd6f4b42f5838534db4f50652bc8e92392a29308f5fe17abe6ba52ef52681fe3fedc47425d19ddb933e57c131efade158c0dc3dd91958f055485e3a72329ae7f593d5c9e1919e1c7172ce77a19da963e84493080d35701b00980b5b85b28eda7f45d54fbcf4bbf0e65e4525b4b136437b3750206ee73759581ea853113675d30756929cbda2de82b23399dd1333a27df4e51e2dbe65b6fb1e9b643696004c19a62b938609e892debe31bda90b2a0137f75589858b77e2584e3b89d5b7bc7a4623de43f885fc727fa7d8d79bf3fa3af79b075a1a043386112d51560e714e84331b37b67dc89a863c755f976489c47ca69d52ad8f1620fc164bf3d2a26030e9db42b7017889a8b9f76a2acd0138853fa4d8e991c573e1acad58e577685c10b5e64af76b1aceb87c1dfbcc36736d45920b6feafba738f5156d7db3e316a789520be641874f524e01b16ea7940c1d1a752b86c7b7cecf37cba372972e806ce72f01dabcf319869d9a48c3a5a4354e4d4d2379624857db52479a083bea754e037f5cee52e9ed0947162364a3771421ef5853bd10de7363234ca9ad609086f78d041a1087718e1617442c9ddcd87f0b25bbf170b9e44c4d09cfe090b64ef50af0615a93aa981e802948dff8f3c1deba01b9c93851b2bb441bf9cd72f6bc5fea0e27476accc9585c9638d4ad826b7dc309b78ed8cba97ef3e0458cb55160f68845e287cde1b59c759fd20f41efb790ac25d362ac6c3f2c1bafa372f99cb0c710b3851a4389be53555225683e79cff57764305090d38a4dd565933f26a9c8a1f4a9bc0dee606545ef0708ada567f5d40710f04484f0bb9ed4ecb5be9a679e43e38ab199cd5c150bbd60ff641a27b01436c475ec4f52aee39d1a5ed91db41dec7c31089ffb7e8b468b53d37811b019c9631c5cbaecd68ab36ae2078b812de344169275db5a726c2c090b275bed1ca25f7514986a856d14db5099ff561b92513caf8586b1cd020cf597864079b202d33f5877943dacf5bb84d575ad48b39861318369125e9b231330f2a5791b7dc83b96249835b5be54689bb88fb5601b9f83ce6a099b7a0a9ff6849de8d3eaa65d83f1893da7d85cf19eca4206d1cd610777bf6969755f7d09b357330d8aa489a6f8d4523d0eb8262ba00771faf7e14e204a0b15616340ebe8d9857121214eaadc7c40572ed345b43f437baea4bd64ef589ebd45f24ba0f133942fd3333fdc1f595c7ca006ed27c1678e3ca6855968f2ee28cbdad0e80201989e3fb7a8cbedacaecd86f8bc1669095810dcf532295996dda2c9bd2d5e64861031becf0c864c036ca2a6146b5697f94caaca8cc5f4f4e4ff1f4cb750fe57c0548ffd139eee39a6930ace0b189fe31321bb9cc44287719e260f169d5a634c13a9bb4c5c5467f406bd175772d631a89bff8cbe09c8523ae50e2b17b8ac9e14aa0a19d37b7e41f24d890a93453bcf3166bff867f780a13bc1b830409a7ae92ff1ed4912d159d7003d63d3e955eff56abf0b9f1beec9b77bef05e2bf4b1573f1ec92ae24f193b81c79b324ce3530cbd7eb92608c1fb828ed1d14c9897659ee4b25cc075a7157fb1f5a07600ff21f12709dca99e96628a5bc7c137513383bde99c1bf36b808806dbbb9666098684c18dfcd187dfceb58196c209677aa69c8ded7f80144a1e04024ceab51cef9a0964b782b74da512c4e730de208ac4a2c445af924d5b7c3b2cb486ac4bb6d33c64e22621075459f74a1301ed6967f1e07e9e56ffdc55551b6fc746de46843607639c5443877aa7db69e4dc9835d50a55708621b91e2aab3c6c4d8edcdfef2d21a3e07f2c32db836c0f0d52cb9c1e046dbdbef4ad0cbc04750ad7fddbd05839a833b57c78dcb853350e268c8b6a8eb0e4b4948439fc12e5a853a6e84e2963d30b329376cecfd14166fb2341f54602d709717fd779340050c32840f70b85775f8035ea4fb23329387a684a449bbefe1620a0ff95b1c39c187c12124f7c3e0784a19a6bd6093497a545b0cae6ff1d28e33517b083b24f82d1c5f09126a8d251cfef5466691c215343462e5ee9f373d075c33e423dab3f9deb79e982f6840d3e62da6a2d9e50d6d37f2e7f23af84f8b0f57bb71c462a4c0f7a9f7afb06b3c32b11f93ea6189b12dc669c946ab85786da3be41c384b4ef9a35f80d7f56b32aa6918cc8c73f9ff7fc2f25d46266243723b98e28cfdd4a3f6f4d931bbb6dbd92fa0430dcb08c93abd08e16220f4c90bf4640afd2d9f07cb38eabd28294d23816389b10f1d0fe71b080b0954e9467dbea407da49da291a12c041156d288260b909f671830a98d05a675018a48b5f3bf50eb4c53c63f2fdb1d9bf8d473f6bad1bf4b2b1a7b0cce000fbdc33f7ec7016015b3b035ef0db407388438ff22ebb0890793e9430472d1691ae1c73fc1a1198f82f68b84cacc32393d1003cd155f2c6fff1aab06692079a0c9ca0540a70473db10b9f356b36577ccaaf54ad952a19f8efef12869642c9ec40a9b5033f3ca46a16c287d6bebc686ec09b28be853c681c516b5089b3b5015a1d3a836e0cdc4ace4b7ad604159ac8e2774a31b65e0f32b50510b7ef1e0cfecd235133b0a7c2cd4cb5707301beedf145ac7007e8d657898a8d45336e3b9ea8e63b0a1db548538e75b7255d451eebd7af1951ccb97dd7446e067f2662270200666296f05328778ea9a3a3aec242d38fbf36f1eb87ed4ff9184cc452b825c3e1637c12c82df14b82b41c1b2df23ae3c3a35e15fca9397abcfd1a0d46624e70f1a054613e62e1d6925944d72be5c31a5b3db3afd423a9b2339b09119e252d4fae4f205312d5a160bcd5b3ae2b2400ff1eb6fdfd455df5b51659a91bad094bb927f3179bd628070b77e8eb247f43d6830ff54b53315cc5f13cbc2628e3c079f232194202b7038a5a39fb4d6fd5a8b5596025a30f7e50593b2db1d160806cea5203214a16c243b509bc6bdf4ffd72b2385688ed27f9ce83a2b1c5bf419696f6af2b3c4aa75c13e77a5f9fd046fc4bc9047461a1066986e21aa9cc497f8f1eeb42fea94d82dce9e8d6f72ad08a18ecfcdca537eb544c89fcca4c4a2c6d67cdbb9afa31914f5decde0ff14bb20e8b29766658368acdbe47cb6af6be9d5ffae48975ea6bac6ff1cf3675c8bd92e2fa188eff1fbbf7ecf9e81abe2911d516b3996ff36d161be4af1d735caa86df29338658e3df56b2f785e1756e9568632742827f3633f32e8d0f249864ec4c9179c89f03155d320d1c2f1533c93ac088509a85f72f140e3eaa51be9c5053ec27ef3659d6a78f8a7c87eeb03c3b21a5639a3a9d530a4e82946fc84ddd6ea47ea3c3e05d4ebed3a6f9fbd9da236980e7da7afe55f6fda7260efac8120362fc825fc36c609c37a1414bbd706b0fcf39465b0098069050f876ac26ebead4d336ad08c847bc69e22ee7eaab38f65c1b96be1787c1b52bbe5d2cf6f9991d48e0d92c1b77b2a7536d885fc393b524637f648d131073ee4bc043130dc0b199fba5afa3dd60575d76bf17a57133c43a7b5d62b8ee466a18dff46e037156a9fae3c664b1ef046accac928f72667a35cc72ae82581d1717a04f3e71159d3da9e12f63b6b4f6f8cee8a374f5cb93f2d2c9dff3d881cbf54e04c943073edd1a49157099f573eaefc097463587957e11e8970a4a0215a1d0c6776782ea7b82c2689c371c60b58d652299b88f7cdfdc42b270c3bde23b93c54d3c0dea22ebf5a30a2cf2f7714b5273b6e0e7a83d53b29cc3c3569457ee1fe0873245db785edfcde92a65756109a3b34303f94c258981502aa4e2f70370cbd58e04238b951b99f54790556f9c65a40991b19da9e918b79a6d6a498cccf9815900132e67d43576579dea496fb26f35c496b3a1e005ddfd9983c7e73cf27424bb53c2f97c0ba0f27b1fbe48542c45d478af7783a5a8881ed66a4c4e1f5e36d371d886837bc4842c55625edcabf855a465a4d5d14a98c61027225c4ede10ca3ddcfc893106d05b91d8790fa0f41388bc3410b451086fb974d6a7087dcfc02bd224560b3519099d2e5839b1025cfc2a9e6bb7b602340cdff432c636a618a72904effa436c73fba5251e385ed1dd44773683dbf6c18859024b0] */