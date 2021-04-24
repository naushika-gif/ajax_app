function memo () {
// memoという関数を定義
  const submit = document.getElementById("submit");
  // idを用いて「投稿する」ボタンの情報を取得
  submit.addEventListener("click", (e) => {
  // 投稿するボタンを「click」した場合に実行される関数を定義
    const formData = new FormData(document.getElementById("form"));
    // フォームに入力した値を取得できるオブジェクトを生成
    const XHR = new XMLHttpRequest();
    // 非同期通心を実装するために必要なXMLHttpRequestのオブジェクトを生成
    XHR.open("POST", "/posts", true);
    // XMLHttpRequestを初期化する リクエストの内容を引数へ追記
    XHR.responseType = "json";
    // レスポンスの形式を定義する
     XHR.send(formData);
    // リクエストを送信する

    //--レスポンスがあった場合の処理の記述--
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
        // エラーが出た場合の処理
      }
      const item = XHR.response.post;
      // レスポンスとして返却されたメモのレコードを返却
      const list = document.getElementById("list");
      // HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const formText = document.getElementById("content");
      // メモの入力フォームを取得 (送信後に入力フォームの文字列を削除するため)
      // ↑非同期通信では画面遷移しないため、フォーム送信後であっても入力した文字列が残ってしまうため
      // スムーズに投稿を行えるように都度削除した方が好ましい
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時:${item.created_at}
          </div>
          <div class= "post-content">
          ${item.content}
          </div>
        </div>`;
        // 「メモとして描画する部分のHTML」を定義
      list.insertAdjacentHTML("afterend", HTML);
      // listという要素に対してinsertAdjacentHTMLでHTMLを追加
      formText.value = "";
      // 「メモの入力フォームに入力されたままの文字」がリセットされる
      // 正確には空の文字列に上書きされるような仕組み
    };
    e.preventDefault();
    // 処理が重複しないようにする
  });
}

window.addEventListener("load", memo);
// ページを読み込んだ時に実行される