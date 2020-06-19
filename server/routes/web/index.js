module.exports = (app) => {
  const router = require("express").Router;
  const mongoose = require("mongoose");
  const Article = mongoose.model("Article");
  const Category = mongoose.model("Category");
  router.get("/news/init", async (req, res) => {
    const parent = await Category.findOne({ name: "news" });
    const cat = await Category.find().where({ parent: parent }).lean();

    const news = [
      "6月17日全服不停机更新公告",
      "体验服“找朋友”功能及“创意编辑”功能维护完成公告",
      "6月16日体验服不停机更新公告",
      "策划有话说丨聊聊荣耀战力计算规则的优化",
      "寻找“峡谷参谋”丨来线下玩家交流活动，见策划&amp;大神主播，赢专属局内称号",
      "云中君源·梦皮肤海报投票活动开启公告",
      "【预告】三雄会面，山雨欲来？",
      "【S20赛季皮肤爆料】醍醐杖·老夫子",
      "【新英雄爆料】萌化！阿古朵来了~",
      "国货生而荣耀，今晚来《新国货》一起上分可好？",
      "【优化预告】游戏内更新机制优化",
      "6月18日体验服停机更新公告",
      "6月17日净化游戏环境声明及处罚公告",
      "6月17日外挂专项打击公告",
      "6月17日“演员”惩罚名单",
      "腾讯游戏扩大人脸识别技术探索的公告",
      "6月17日全服不停机更新公告",
      "“游戏家中国行·王者零距离”延期举办说明",
      "体验服“找朋友”功能及“创意编辑”功能维护完成公告",
      "恭喜TS夺得2020年KPL春季赛总冠军，多重福利来袭",
      "应援KPL春决得好礼，上官婉儿-天狼绘梦者即将开售",
      "【破浪前行吧英雄们】活动开启公告",
      "参与活动免费解锁KPL限定皮肤个人专属购买6折特权",
      "新英雄蒙恬上架，多重好礼等你解锁",
      "应援KPL得好礼，福利清单就绪",
      "DIY告白信 520陪您花式告白",
      "爱在峡谷 甜蜜520",
      "无惧挑战向阳而生，TS冠军之夜今日18:00惊喜来袭",
      "虎牙明星主播踢馆名校战队，峡谷高材生与学霸的荣耀对决",
      "2020年KPL春季赛常规赛最佳阵容及最佳选手评选方式公布",
      "2020年KPL春季赛季后赛赛程赛制公布，5月28日16:00热血开战",
      "【原创内容大赛音乐比赛】优秀作品合集（二）",
      "大众赛事合作赛道全面开启，携手合作伙伴共建王者电竞生态",
      "【KPL今日预报】南京Hero久竞 vs DYG，DYG.久诚迎战老东家能否取胜",
      "关于责成TS俱乐部就欠薪问题进行说明的通知",
    ];
    const randomw = cat.slice(0).sort((a, b) => Math.random - 0.5);
    const newsList = news.map((v) => ({
      title: v,
      categories: [randomw.slice(0, 2)],
    }));
    await Article.deleteMany({});
    await Article.insertMany(newsList);
  });

  router.get("/news/list", async (req, res) => {
    //   const parent=await (await Category.findOne({name:"news"})).populated({path:'children',populate:{path:'newsList'}})
    const parent = await Category.findOne({ name: "news" });
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {$lookup:{from:'articles',localField:'_id',foreignField:'categories',as:'newsList'}},
      {$addFields:{newsList:{$slice:['$newsList',5]}}}
    ]);
    const subCats=cats.map(v=>v._id)
    cats.unshift({name:'热门',newsList:await Article.find().where({ categories:{$in:subCats}}).populate('categories').limit(5).lean()})

    cats.map(cat=>{
        cat.newsList.map(news=>{
            news.categoryName=cat.name==='热门'?news.categories[0].name:cat.name
            return news
        })
        return cat
    })
    res.send(cats)
  });
  app.use("/web/api");
};
