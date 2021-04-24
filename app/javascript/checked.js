function check () {
  // ①関数の定義：DOMの取得からエンドポイントへのリクエストまでを行う
  // ⭐️表示されているすべてのメモを取得している

  // ②--クリック時のイベント定義--
  const posts = document.querySelectorAll(".post");
  // 2-1.クリックされる部分の要素の取得

  // --- ③要素1つずつに対して「クリック」した際に動作する処理を記述---
  posts.forEach(function (post) {
    // 3-1.forEachを記述してそれぞれの要素への処理を記述する場所を用意
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // 3-2. 条件分岐を実装することで重複したイベント発火を回避する
    // 要素にdata-load = "true"と属性を追加
    // ⭐️メモをクリックした場合に実行する処理を定義している

    post.addEventListener("click", () => { 
      // 3-2.要素1つずつに対して「クリック」した際に動作するイベント駆動を設定
      // ⭐️どのイベントをクリックしたのか、カスタムデータを利用して取得している

      // ↑で「メモをクリックした時に、何らかの処理を行う」という設定完了//

    //--- ④「何らかの処理」を記述していく---

       const postId = post.getAttribute("data-id");
      //  4-1.メモのidを取得する URLパラメーターでサーバーに送る
      const XHR = new XMLHttpRequest();
      // 4-2.Ajaxによるリクエストを送るためのオブジェクトの生成。
      // エンドポイントへリクエストし、JSON形式のレスポンスを受け取る
      // ⭐️Ajaxに必要なオブジェクトの生成
      XHR.open("GET",`/posts/${postId}`, true);
      // 4-3.エンドポイントへのリクエスト処理詳細の記述。
      // リクエストを送ると、JSON形式のデータが返却される
      // ⭐️openでリクエストを初期化する
      XHR.responseType = "json";
      // 4-4レスポンスの形式を指定
      // ⭐️レスポンスのタイプを指定する
      XHR.send();
      // 4-5.リクエストを送信
      // ⭐️レスポンスを受け取った時の処理を記述する

      // --⑤レスポンスに対する記述--
      XHR.onload = () => {
        // 5-1.レスポンスなどの受信が成功した場合のイベントハンドラーを設定

        if (XHR.status !=200){
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // ⭐️レスポンスのHTTPステータスを解析し、該当するエラ〜メッセージをアラートで表示するようにしている
          return null;}
          // ⭐️処理を終了している
        // ↑5-4.エラーが出た場合の処理について記述
        // HTTPステータスコードが200以外の場合はアラートを表示し、JSの処理から抜け出すようにしている

        const item = XHR.response.post;
        // 5-2.レスポンスされてきたJSONにアクセス
        // ⭐️レスポンスされたデータを変数itemに代入している

        if (item.checked === true) {
          // ⭐️既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          // ⭐️未読状態であれば、カスタムデータを削除している
          post.removeAttribute("data-check");
        //5-3.既読であるかどうかを判断し、情報を切り替える処理をする
        }
      };
    });
   });
}
// ⑥一定の時間でメモ投稿一覧を全て取得する処理
setInterval(check, 1000);
// check関数が1秒に一度実行されるようにする