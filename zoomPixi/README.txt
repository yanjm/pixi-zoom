====================> uipositionconfig.json <====================>

1.postype值含义
    必须字段；
    "postype": 1, Sprite_button;支持点击缩放效果；
    "postype": -1, Sprite

    "postype": 0, Sprite_button;支持裁剪事件触发范围

    "postype":8,Container

    "postype":9,PIXI.Text
    "postype": -9,取消处理，不在界面绘制

2.Node含义
    btnname,描定改对象在全局的对象名；需确保唯一；必须字段；
    sx、sy,分别对应scale.x、scale.y，描述该Sprite在x,y方向上的缩放值，非必须字段，默认值：1；

3.同一文件的多次引用示例
    如：
    "Mooji_Ui_Icon.png":{
        "postype": -1,
        "x": 540,
        "y": 800,
        "btnname":"Mooji_Ui_Icon"
    },
    "[1R]Mooji_Ui_Icon.png":{
        "postype": -1,
        "x": 540,
        "y": 900,
        "btnname":"Mooji_Ui_Icon_1"
    },
    "[2R]Mooji_Ui_Icon.png":{
        "postype": -1,
        "x": 540,
        "y": 700,
        "btnname":"Mooji_Ui_Icon_2"
    }
    其中：
    (1)文件名需添加前缀：[?R]
    (2)btnname,需区别唯一

4.多层节点支持
    支持对节点的递归处理;
    所有子节点需以：childnode进行申明；所定义的子节点归于上一级节点，不越级归于该部节点的root节点；