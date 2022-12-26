function transfrom(route, data) {
    let fn = str2Fun.get(route);
    if(fn) {
        return fn(data);
    }

    return `你的路由 ${route} 还没写方法 -- requestDataDeal.js`
}

var str2Fun = new Map();
const accMax = 3;
export default transfrom;

/**
 * 判定风险是否达标
 */
function isAcc(score){
  let minScore = 3;
  return score < minScore ? "是" : "否";
}

/**
 * 获取风险等级
 */
function getLevel(score) {
  let r = `无此等级 ${score}`;
  switch(score) {
    case 1 : r = '极低风险'; break;
    case 2 : r = '低风险'; break;
    case 3 : r = '中风险'; break;
    case 4 : r = '高风险'; break;
    case 5 : r = '极高风险'; break;
  }
  return r;
}


/**
 * 处理 /asset/all?projectId=1
 * 后端数据 [ {"id": 1,"name": "OA数据库服务器","confidentiality": 4,"integrity": 2,
 *         "availability": 2,"value": 4,"responsible": "张三","note": "{部门:信息中心}"},]
 * 前端数据 [ {num:1, assetName:'OA数据库服务器', dutyPerson:'张三', 
 *            c:4, i:2, a:2, value:4, note:"信息部门"}]
 */
function trans_asset_all(data) {
    let result = data.map(v => {
        return {
            num:v.id, 
            assetName:v.name, 
            dutyPerson:v.responsible,        
            c:v.confidentiality, 
            i:v.integrity, 
            a:v.availability, 
            value:v.value, 
            note:v.note
        };
    });
    
    return result;
}
str2Fun.set('/asset/all', trans_asset_all);


/**
 * 处理 /threat/all
 * 后端数据 [
  {
    "asset": {
      "id": 1,
      "name": "OA数据库服务器",
      "confidentiality": 4,
      "integrity": 2,
      "availability": 2,
      "value": 4,
      "responsible": "张三",
      "note": "{部门:信息中心}"
    },
    "data": [
      {
        "id": 1,
        "value": 2,
        "threatClass": "操作失误"
      },
      {
        "id": 2,
        "value": 3,
        "threatClass": "木马后门攻击"
      },
      {
        "id": 3,
        "value": 2,
        "threatClass": "未授权访问"
      }
    ]
  },
]
 * 前端数据
 * [
        {num:1, assetName:'数据库资料', threatName:'恶意攻击、木马', 
            threatValue:3, note:'系统重要资产'}
    ]
 */
function trans_threat_all(data) {
    let result = [];
    for(let item of data) {
        let assetName = item["asset"]["name"];
        for(let data_item of item["data"]) {
            result.push(
                {
                    num:data_item['id'], 
                    assetName,
                    threatName:data_item['threatClass'], 
                    threatValue:data_item['value'], 
                    note:data_item['note']
                }
            )
        }
    }
    return result;
}
str2Fun.set('/threat/all', trans_threat_all);


/**
 * 处理 /vuln/all
 * 后端数据
 * [
  {
    "asset": {
      "id": 1,
      "name": "OA数据库服务器",
      "confidentiality": 4,
      "integrity": 2,
      "availability": 2,
      "value": 4,
      "responsible": "张三",
      "note": "{部门:信息中心}"
    },
    "data": [
      {
        "id": 1,
        "vulnAll": {
          "id": 1,
          "name": "安装维护缺乏管理",
          "dealMethod": "制定相关流程管理"
        },
        "value": 3
      },
      {
        "id": 2,
        "vulnAll": {
          "id": 2,
          "name": "操作系统补丁未安装",
          "dealMethod": "安装相关补丁"
        },
        "value": 2
      },
      {
        "id": 3,
        "vulnAll": {
          "id": 3,
          "name": "安装与维护缺乏管理",
          "dealMethod": "制定维护指南"
        },
        "value": 2
      }
    ]
  }
]
 * 前端数据 [{num:1, assetName:'数据库资料', vulnName:'数据完整性、维护和管理', vulnValue:4}]
 */
function trans_vuln_all(data) {
    let result = [];
    for(let item of data) {
        let assetName = item["asset"]["name"];
        for(let data_item of item["data"]) {
            result.push(
                {
                    num:data_item['id'], 
                    assetName,
                    vulnName:data_item['vulnAll']['name'], 
                    vulnValue:data_item['value']
                }
            )
        }
    }
    return result;
}
str2Fun.set('/vuln/all', trans_vuln_all);


/**
 * 处理 /result/get
 * 后端
 * [
    {
      "asset": {
        "name": "OA数据库服务器",
        "value": 4
      },
      "vuln": {
        "name": "安装维护缺乏管理",
        "value": 3
      },
      "threat": {
        "name": "操作失误",
        "value": 2
      },
      "value": 4,
      "possibility":4,
      "loss":3,
    },
  ]
 * 前端
 * [{num:1, assetName:'网络管理员', assetValue:4, threatName:'社会工程威胁', 
      possibility:1,loss:3, risk:2, isAcc:'是', riskLevel:'低'},]
 */
function trans_result_get(data) {
  // debugger
  let result = data.map(v => {
    let risk = v['value'];
    return {
      // num:1, 
      assetName:v['asset']['name'], 
      assetValue:v['asset']['value'], 
      threatName:v['vuln']['name'], 
      possibility:v['possibility'],
      loss:v['loss'], 
      risk,
      isAcc:isAcc(risk), 
      riskLevel:getLevel(risk)
    }
  });
  return result;
}
str2Fun.set('/result/get', trans_result_get);


/**
 * 转换结果为levels
 * 后端 同上
 * 前端
 * [
    {level:'极高风险',num:6},
    {level:'高风险',num:14},
    {level:'中风险',num:1},
    {level:'低风险',num:19},
    {level:'极低风险',num:20},
  ]
 */
function trans_result_get_2_levels(data){
  let levels = [0,0,0,0,0];

  data.forEach(element => {
    let v = parseInt(element['value']);
    v = v > 0 ? v-1 : 0;
    levels[v] += 1;
  });

  let r = [
    {level:'极高风险',num:levels[4]},
    {level:'高风险',num:levels[3]},
    {level:'中风险',num:levels[2]},
    {level:'低风险',num:levels[1]},
    {level:'极低风险',num:levels[0]},
  ];

  return r;
}
str2Fun.set('/result/get#levels',trans_result_get_2_levels)


function trans_result_get_2_acc(data){
  let acc=0, notAcc=0;
  data.forEach(element => {
    let v = parseInt(element['value']);
    if(v <= accMax){
      acc += 1;
    } else {
      notAcc += 1;
    }
  });

  let r = [
    {type:'可接受',num:acc},
    {type:'不可接受',num:notAcc}
  ];

  return r;
}
str2Fun.set('/result/get#acc', trans_result_get_2_acc);


/**
 * 转换不可接受风险处理计划
 */
function trans_result_get_2_deal_plan(data) {
  let r = [];
  data.forEach(e => {
    let value = e['asset']['value'];
    if(value <= accMax){
      return ;
    }

    r.push(
      {
        name:e['asset']['name'], 
        vulnName:e['vuln']['name'], 
        existedMeasure:e['vuln']['note'], 
        giveMeasure:e['vuln']['dealMethod'], 
        deadline: TransStrTime(e['vuln']['deadline'])
      }
    )
  });

  return r;
}
str2Fun.set('/result/get#dealPlan', trans_result_get_2_deal_plan);
function TransStrTime(str){
  if(!str) {
    return;
  }
  let date = new Date(str);
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}