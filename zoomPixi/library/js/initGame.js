


function contain(sprite, container) {

  var collision = undefined;

  //Left
  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision = "left";
  }

  //Top
  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision = "top";
  }

  //Right
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    collision = "right";
  }

  //Bottom
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    collision = "bottom";
  }

  //Return the `collision` value
  return collision;
}

function inituis(){
  $.getJSON('./images/uipositionconfig.json',function(data){
      uidata = data.innerui;
      uitextdate = data.innertext;
      chatdata = data.chat;
  });
}



//内城功能，ui,布局函数
function initInnerSceneUI(){
  background = new PIXI.Sprite(resources.background.texture);
    background.position.x = 0;
    background.position.y = 0;

    idz = PIXI.loader.resources["images/zs.json"].textures; 
    let fs = [
        idz["Mooji_jiangshiA_01_0000.png"],
        idz["Mooji_jiangshiA_01_0002.png"],
        idz["Mooji_jiangshiA_01_0004.png"],
        idz["Mooji_jiangshiA_01_0006.png"]
    ];
    pixie = new MovieClip(fs);
    pixie.animationSpeed=0.15;
    pixie.play();
    pixie.x = 150;
    pixie.y = 160; 
    pixie.vx = 0;
    pixie.vy = 0; 

    psle = new PIXI.Sprite(res_mainui["Mooji_Ui_Button_Recharge_Big1.png"]);
    psle.visible = false;
    pixie.addChild(psle);

    pixie.interactive = true;
    pixie.buttonMode = true;
    pixie.click = function(data){//聊天-退出事件
       psle.visible = !psle.visible;
      if(psle.visible){
        innerSel = pixie;
        listenrevent(pixie);
      }else{
        innerSel = null;
      }

    }
    
    // pixie1 = pixie;
    pixie1 = new MovieClip(fs);
    pixie1.animationSpeed=0.35;
    pixie1.play();
    pixie1.x = 250;
    pixie1.y = 360; 
    pixie1.vx = 0;
    pixie1.vy = 0; 

    psle1 = new PIXI.Sprite(res_mainui["Mooji_Ui_Button_Recharge_Big1.png"]);
    psle1.visible = false;
    pixie1.addChild(psle1);

    pixie1.interactive = true;
    pixie1.buttonMode = true;
    pixie1.click = function(data){//聊天-退出事件
       psle1.visible = !psle1.visible;
       if(psle1.visible){
        innerSel = pixie1;
        listenrevent(pixie1);
      }else{
        innerSel = null;
      }
       
    }
    // if (pointer.hitTestSprite(background)) {
    //   pointer.cursor = "pointer";
    // }else {
    //   pointer.cursor = "auto";
    // }
    background.addChild(pixie);
    background.addChild(pixie1);
    city.addChild(background);

}


//世界地图功能，ui,布局函数
function initOuterSceneUI(){
    world.addChild(res_outmap);

    let idm = PIXI.loader.resources["images/zs.json"].textures; 

    let fsm = [
        idm["Mooji_jiangshiA_01_0000.png"],
        idm["Mooji_jiangshiA_01_0002.png"],
        idm["Mooji_jiangshiA_01_0004.png"],
        idm["Mooji_jiangshiA_01_0006.png"]
    ]

    pixim = new MovieClip(fsm);
    pixim.animationSpeed=0.35;
    pixim.play();
    pixim.x = 150;
    pixim.y = 160; 
    pixim.vx = 0;
    pixim.vy = 0; 

    // if(sceneState == outer){
    //   listenrevent(pixim);//待进一步处理：与录入冲突
    //   // t.arrowControl(pixim, 5);
    // }
    
    res_outmap.addChild(pixim)
}

//UI层，Text,布局函数
function initUITextUI(){
  for(let layername in uitextdate){
      let layer = uitextdate[layername]
      for(let prop in layer){
          // this[prop]
          uitextact("",prop,layer[prop]);
      }
    }

    diamondNum.text = "6500";
    fightValue.position.x = renderer.width/2-fightValue.width/2;
    foodValue.position.x = renderer.width/3-foodValue.width/2;
    woodValue.position.x = renderer.width/1.5-woodValue.width/2;
    mapValue.position.x = 60-mapValue.width/2;
    kingdomValue.position.x = 580-kingdomValue.width/2;
    innerui.addChild(lastChat);
}

//聊天功能，UI，布局函数
function initChatUI(){
  
    chatObject();
    for(let layername in chatdata){
      let layer = chatdata[layername]
      for(let prop in layer){
          chatact(this[prop],prop,layer[prop]);
      }
    }
    
    
    chatLimit.height = renderer.height;
    chatsGroup.position.y = -(chatsGroup.height+renderer.height);
    chatLimit.addChild(chatsGroup);

    Mooji_Ui_Close_Button.position.x = renderer.width-Mooji_Ui_Close_Button.width-20;
    Mooji_Ui_Close_Button.interactive = true;
    Mooji_Ui_Close_Button.buttonMode = true;
    Mooji_Ui_Close_Button.mousedown = function(data){
      Mooji_Ui_Close_Button.scale.x += 0.1;
      Mooji_Ui_Close_Button.scale.y += 0.1;
    }
    Mooji_Ui_Close_Button.mouseup = function(data){
      Mooji_Ui_Close_Button.scale.x -= 0.1;
      Mooji_Ui_Close_Button.scale.y -= 0.1;
      
      sceneState = pre_sceneState;
    }

    chatValue.position.x = renderer.width/2 - chatValue.width/2;

    Mooji_Ui_Eject_Frame1.scale.y = 1.3;

    Mooji_Black_Dark_Bottom1.position.y = Mooji_Ui_Up_Bottom_Iron.height-20;
    Mooji_Black_Dark_Bottom1.position.x = -10;
    Mooji_Black_Dark_Bottom1.scale.x = 1.5;
    // chatStyle.addChild(chatBar2);


    Mooji_Ui_Btn_Blue_80x78.position.y = renderer.height-Mooji_Ui_Btn_Blue_80x78.height;

    Mooji_Buttom_F1_434X62.position.y = Mooji_Ui_Btn_Blue_80x78.position.y+5;
    Mooji_Buttom_F1_434X62.scale.x = 2;
    Mooji_Buttom_F1_434X62.scale.y = 1.1;


    Mooji_Ui_Btn_Yellow_80x78.position.x = renderer.width - Mooji_Ui_Btn_Yellow_80x78.width;
    Mooji_Ui_Btn_Yellow_80x78.position.y = Mooji_Ui_Btn_Blue_80x78.position.y;
    Mooji_Ui_Btn_Yellow_80x78.interactive = true;
    Mooji_Ui_Btn_Yellow_80x78.buttonMode = true;
    Mooji_Ui_Btn_Yellow_80x78.mousedown = function(data){
      Mooji_Ui_Btn_Yellow_80x78.scale.x += 0.1;
      Mooji_Ui_Btn_Yellow_80x78.scale.y += 0.1;
      chatSubValue.scale.x += 0.1;
      chatSubValue.scale.y += 0.1;
    }
    Mooji_Ui_Btn_Yellow_80x78.mouseup = function(data){//
      let chatInp = document.getElementById('chatInput').value;
      console.log("你输入的信息："+chatInp);
      Mooji_Ui_Btn_Yellow_80x78.scale.x -= 0.1;
      Mooji_Ui_Btn_Yellow_80x78.scale.y -= 0.1;
      chatSubValue.scale.x -= 0.1;
      chatSubValue.scale.y -= 0.1;
    }
 
    chatSubValue.position.y = Mooji_Ui_Btn_Yellow_80x78.position.y + chatSubValue.width/1.7;
    chatSubValue.position.x = Mooji_Ui_Btn_Yellow_80x78.position.x + chatSubValue.height/1.5;
}


function uibtnact(btnObj,prop,buttonInfo){
  btnObj = new Sprite(res_mainui[prop]);
  btnObj.btnName = prop;
  btnObj.position.x = buttonInfo.x;
  btnObj.position.y = buttonInfo.y;
  btnevent(btnObj,buttonInfo);
  innerui.addChild(btnObj);
}

function chatact(btnObj,prop,buttonInfo){

  if(buttonInfo.postype==8){
    this[buttonInfo.btnname] = new Container();
  }
  else if(buttonInfo.postype==9){
    this[buttonInfo.btnname] = new PIXI.Text(buttonInfo.text,{fontSize:buttonInfo.fontsize,fill:buttonInfo.fill});
    this[buttonInfo.btnname].position.x = buttonInfo.x;
    this[buttonInfo.btnname].position.y = buttonInfo.y;
  }
  else{
    this[buttonInfo.btnname] = new Sprite(res_mainui[prop]);
    this[buttonInfo.btnname].position.x = buttonInfo.x;
    this[buttonInfo.btnname].position.y = buttonInfo.y;
  }



  chatStyle.addChild(this[buttonInfo.btnname]);
}

function uitextact(btnObj,prop,buttonInfo){
  this[prop] = new PIXI.Text(buttonInfo.text,{fontSize:buttonInfo.fontsize,fill:buttonInfo.fill});
  this[prop].position.x = buttonInfo.x;
  this[prop].position.y = buttonInfo.y;
  innerui.addChild(this[prop]);
}

function changeState(uiName){
  
  pre_sceneState = sceneState;
  if("Mooji_Ui_Map.png"==uiName){
    if (sceneState == inner){
      sceneState = outer;
      t.makeDraggable(res_outmap);
    }else{
      sceneState = inner;
      t.makeDraggable(background);
    }
  }else if("Mooji_Ui_Down_Bottom.png"==uiName){
    sceneState = chat;
    t.makeDraggable(chatsGroup);
  }else if("Mooji_Ui_Diamonds.png"==uiName){
    sceneState = goods;
    t.makeDraggable(itemsGroup);
  }
}

function createbtnrange(btnrange,btnObj,buttonInfo){
  t.makeInteractive(btnrange);
  btnrange.position.x = buttonInfo.btnx;
  btnrange.position.y = buttonInfo.btny;
  btnrange.width = buttonInfo.btnw;
  btnrange.height = buttonInfo.btnh;
  // btnrange.press =()=>{
  //   console.log("press11ww:"+btnObj.width+btnObj.height);
  // };
  btnrange.release =()=>{
    changeState(btnObj.btnName);
  };

}


function btnevent(btnObj,buttonInfo){
  if(buttonInfo.postype !=-1){//-1,不处理事件
    if(buttonInfo.postype == 0){//0，裁剪范围事件
      this[btnObj.btnName+"event"] = new Sprite();
      createbtnrange( this[btnObj.btnName+"event"],btnObj,buttonInfo)

    }else if(buttonInfo.postype == 9){//9,Text
    }else{//sprite，即事件触发
      btnObj.interactive = true;
      btnObj.buttonMode = true;
      // btnObj.click = function(data){//Sprite点击事件
      //   changeState(btnObj.btnName);
      // }
      btnObj.mousedown = function(data){
        btnObj.scale.x += 0.1;
        btnObj.scale.y += 0.1;
      }
      btnObj.mouseup = function(data){
        btnObj.scale.x -= 0.1;
        btnObj.scale.y -= 0.1;
        changeState(btnObj.btnName);
      }
    }
  }
}

function chatObject(){
  chatsGroup = new Container() ;
  getChats();

}

let chatJosn =  '{"name":"player1w","headimg":"dalier.png","chatmsg":"只是聊会天,有事没事打打仗啦"}';
function getChats(){
  let chatInfo = JSON.parse(chatJosn);

  for(let i=1;i<=12;i++){

    let chatContainer = new Container();
    chatContainer.position.y = 0+i*150;

    let chatHead = new Sprite(res_mainui[chatInfo.headimg]);
    chatHead.position.x = 0;
    chatHead.position.y = 0+i*50;

    let chatData = new PIXI.Text(chatInfo.name+"[WAR]",{fontSize:"20px Arial",fill:"white"});
    chatData.position.x = chatHead.width;
    chatData.position.y = chatHead.position.y;

    let chatMsg = new PIXI.Text(chatInfo.chatmsg,{fontSize:"15px Arial",fill:"red"});
    chatMsg.position.x = chatHead.width;
    chatMsg.position.y = chatHead.position.y+chatData.height*1.5;

    everychat(chatContainer,chatHead,chatData,chatMsg,i);

    if(i==12){//最新聊天

      let chatHeadL = new Sprite(res_mainui[chatInfo.headimg]);
      lastChat = new Container();

      chatHeadL.scale.x = 0.3;
      chatHeadL.scale.y = 0.3;
      lastChat.addChild(chatHeadL);

      let chatDataL = new PIXI.Text(chatInfo.name+"[WAR]",{fontSize:"20px Arial",fill:"black"});

      chatDataL.scale.x = 0.7;
      chatDataL.scale.y = 0.7;
      lastChat.addChild(chatDataL);
      chatDataL.position.x = chatHeadL.width;
      chatDataL.position.y = chatHeadL.position.y;

      let chatMsgL = new PIXI.Text(chatInfo.chatmsg,{fontSize:"15px Arial",fill:"black"});
      chatMsgL.scale.x = 0.7;
      chatMsgL.scale.y = 0.7;
      lastChat.addChild(chatMsgL);

      chatMsgL.position.x = chatHeadL.width;
      chatMsgL.position.y = chatHeadL.position.y+chatDataL.height*1.5;


      lastChat.position.x = 200;
      lastChat.position.y = 1020;
    }

    
  }
}

function everychat(chatContainer,chatHead,chatData,chatMsg,i){
    let rowEnd = new PIXI.Text(i);
    rowEnd.position.x = 520;
    rowEnd.position.y = chatData.position.y ;
    
    chatContainer.addChild(chatHead);
    chatContainer.addChild(chatData);
    chatContainer.addChild(chatMsg);
    chatContainer.addChild(rowEnd);

    chatsGroup.addChild(chatContainer);

    
}

function goodsObject(){
  itemsGroup = new Container() ;
  getItems();
}

let itemJosn =  '{"itemname":"20000000金币","itembackimg":"Mooji_Ui_Icon_Iron_Red_Bg125x125.png","itemimg":"Mooji_Ui_Gold5.png","itemmsg":"使用后得金币无数","price":"2000",'
              +'"pricebackimg":"Mooji_Ui_Btn_Blue_178x64.png",'
              +'"pricetypeimg":"Mooji_Ui_Diamonds.png"'
              +'}';
function getItems(){
  let itemInfo = JSON.parse(itemJosn);

  for(let i=1;i<=12;i++){

    let itemContainer = new Container();
    itemContainer.position.y = 0+i*150;

    let itemHead = new Sprite(res_mainui[itemInfo.itembackimg]);
    let item = new Sprite(res_mainui[itemInfo.itemimg]);
    itemHead.addChild(item);
    itemHead.position.x = 0;
    itemHead.position.y = 0+i*50;

    let itemData = new PIXI.Text(itemInfo.itemname,{fontSize:"20px Arial",fill:"blue"});
    itemData.position.x = itemHead.width;
    itemData.position.y = itemHead.position.y;

    let itemMsg = new PIXI.Text(itemInfo.itemmsg,{fontSize:"15px Arial",fill:"grey"});
    itemMsg.position.x = itemHead.width;
    itemMsg.position.y = itemHead.position.y+itemData.height*1.5;


    let itemPrice = new Sprite(res_mainui[itemInfo.pricebackimg]);
    let priceType = new Sprite(res_mainui[itemInfo.pricetypeimg]);   
    let price = new PIXI.Text(itemInfo.price,{fontSize:"20px Arial",fill:"white"});
    price.position.x = itemPrice.position.x +itemPrice.width/2.5;
    price.position.y = itemPrice.position.y+itemPrice.height/2.5;
    itemPrice.addChild(priceType);
    itemPrice.addChild(price);
    itemPrice.position.x = renderer.width-itemPrice.width*1.5;
    itemPrice.position.y = itemHead.position.y+itemData.height*1.5;

    itemPrice.interactive = true;
    itemPrice.mousedown = function(data){
        priceType.scale.x += 0.1;
        priceType.scale.y += 0.1;
        price.scale.x += 0.1;
        price.scale.y += 0.1;
      }
      itemPrice.mouseup = function(data){
        priceType.scale.x -= 0.1;
        priceType.scale.y -= 0.1;
        price.scale.x -= 0.1;
        price.scale.y -= 0.1;
      }
    
    everygoods(itemContainer,itemHead,itemData,itemMsg,itemPrice,i);
  }
}

function everygoods(itemContainer,itemHead,itemDate,itemMsg,itemPrice,i){
    let rowLine = new Sprite(res_mainui["Mooji_Dividing_line.png"]);
    rowLine.position.y = (itemHead.position.y+itemHead.height);

    itemContainer.addChild(itemHead);
    itemContainer.addChild(itemDate);
    itemContainer.addChild(itemMsg);
    itemContainer.addChild(itemPrice);
    itemContainer.addChild(rowLine);

    itemsGroup.addChild(itemContainer);
    // itemsGroup.addChild(itemPrice);
}


// function initallbtninfo(){
//   $.getJSON('./images/innerui.json',function(data){
//       let layers = data.layers;
//       for(let i in layers){
//           let tempLayer = layers[i];
//           if(tempLayer.name == "btns"){
//             let tempObjects = tempLayer.objects
//             for(var j in tempObjects){
//                 innerBtns[tempObjects[j].name] = tempObjects[j]; 
//             }
//           }
//       }

//   });

//   $.getJSON('./images/outerui.json',function(data){
//       let layers = data.layers;
//       for(let i in layers){
//           let tempLayer = layers[i];
//           if(tempLayer.name == "btns"){
//             let tempObjects = tempLayer.objects
//             for(var j in tempObjects){
//                 outerBtns[tempObjects[j].name] = tempObjects[j]; 
//             }
//           }
//       }

//   });
// }



function listenrevent(obj){

  let left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

    
  left.press = function() {
    obj.vx = -5;
    obj.vy = 0;

  };

  left.release = function() {
    if (!right.isDown && obj.vy === 0) {
      obj.vx = 0;
    }
  };

  up.press = function() {
    obj.vy = -5;
    obj.vx = 0;
  };
  up.release = function() {
    if (!down.isDown && obj.vx === 0) {
      obj.vy = 0;
    }
  };

  right.press = function() {
    obj.vx = 5;
    obj.vy = 0;
  };
  right.release = function() {
    if (!left.isDown && obj.vy === 0) {
      obj.vx = 0;
    }
  };

  down.press = function() {
    obj.vy = 5;
    obj.vx = 0;
  };
  down.release = function() {
    if (!up.isDown && obj.vx === 0) {
      obj.vy = 0;
    }
  };

  
}


function keyboard(keyCode,obj) {
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    if(sceneState!=chat){
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    if(sceneState!=chat){
      event.preventDefault();
    }
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), true
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), true
  );

  return key;
}