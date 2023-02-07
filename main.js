// TODO 一部デバフを固定できるようにする
// TODO 答え合わせ機能
// TODO 全ジョブ対応
// TODO 画像を置いて設定を書くことで,任意のデバフで使えるようにする
// TODO 設定の保存
var timeout = 0
$(function(){
  $("#partyList").children().each(function(){
    var job = $(this).attr("class").replace("player ", "");
    $(this).append('<div class="sortButton top float"><button class="topButton">t</button></div>')
    $(this).append('<div class="sortButton prev float"><button class="prevButton">↑</button></div>')
    $(this).append('<div class="sortButton next float"><button class="nextButton">↓</button></div>')
    $(this).append('<div class="float"><img src="img/' + job + '.png"></div>')
    $(this).append('<div class="debuffs float">')
  });

  $("#start").click(function(){
    clearTimeout(timeout);
    deleteAllDebuffs()
    var time = $('#time').val()
    
    var tmp = []; // 付与デバフ一覧を得る処理は後で関数化したい
    for(var i=0;i<8;i++){
      tmp.push(Math.random());
    }
    var tmp2 = tmp.concat();
    var middle = tmp2.sort()[4];

    var debuffs = []
    for(var i=0;i<8;i++){
      debuffs.push(tmp[i] >= middle ? 'd1' : 'd2');
    }
    setDebuffs(debuffs);

    timeout = setTimeout(function(){
      var tmp = [];
      for(var i=0;i<8;i++){
        tmp.push(Math.random());
      }
      var tmp2 = tmp.concat();
      var middle = tmp2.sort()[4];
      var middle2 = tmp2[6];

      var debuffs = [];
      for(var i=0;i<8;i++){
        if (tmp[i]>= middle2) {
          debuffs.push('1st')
        } else if (tmp[i]>= middle) {
          debuffs.push('2nd')
        } else {
          debuffs.push('')
        }
      }
      setDebuffs(debuffs);
    }, time);
  });

  $(".topButton").click(function(){
    var tar = $(this).parent().parent()
    tar.prependTo(tar.parent());
  })
  $(".nextButton").click(function(){
    var tar = $(this).parent().parent()
    if(tar.next()) tar.insertAfter(tar.next());
  })
  $(".prevButton").click(function(){
    var tar = $(this).parent().parent()
    if(tar.prev()) tar.insertBefore(tar.prev());
  })
  $("#toggleSort").click(function(){
    $(".sortButton").toggle();
  })
});

function getDebuffList(arr) {
}

function setDebuffs(debuffs) {
  var players = $(".player");
  for(var i=0;i<8;i++){
    if (!debuffs[i]) continue;
    $(players[i]).find('.debuffs').append('<img src="img/' + debuffs[i] + '.png">')
  }
}

function deleteAllDebuffs(){
  $(".debuffs").empty();
}
