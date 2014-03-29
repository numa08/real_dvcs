!SLIDE
# GitとSVNの同時運用

## [@numa08](https://twitter.com/numa08)

!SLIDE

## 自己紹介

 ![](hello/icon.jpeg)

 - [@numa08](https://twitter.com/numa08)
 - 人間git-svn
 - アイコンかわいいガチ勢

!SLIDE

## 今日話すこと

 - GitとSubversionが共存する環境下で
 - 両方を同時に運用し
 - リポジトリをぶっ壊さない方法

!SLIDE

## 環境

 - Subversion
     - 社外
     - コミット権保持者が限られてる
     - standartな構成ではない

!SLIDE

## 環境

 - Git
     - 社内
     - Gitlab使ってます
     - master以外は誰でもコミットできる
     - git-flowは使ってないよ

!SLIDE

## 要求

 - SubversionのコードをGitに移動
 - 開発はGitのトピックブランチで開発
 - プルリク後にmasterにマージ
 - マージ後Subversionにもcommit

!SLIDE

## 登場人物

 - 開発者
     - 実装とかする
     - Subversionへのコミット権は無い
     - Gitのmasterへプッシュ権は無い

!SLIDE

## 登場人物

 - 管理者
     - 実装とかする
     - Subversionへのコミット権がある
     - Gitのmasterへのプッシュ権がある

!SLIDE

## SubversionからGitに移動

```bash
git svn cloen ${SVN_URL} --trunck=${trunk} \
--tags=${tags} --braches=${branche1} \
--branches=${branche2} ${dir}
cd ${dir}
git remote add origin ${GIT_URL}
git push origin master
```

!SLIDE

## SubversionからGitに移動

 - git-svnで可能
 - オプションの指定でブランチやタグが散らばっててもなんとかなる
 - URLに日本語がある場合は、パーセントエンコード
 - でかいリポジトリだと時間がかかる
      - 指定のリビジョン以降取得とかも検討

!SLIDE

## 開発者が増えたよ

 
```bash
git clone ${GIT_URL} ${dir}
cd ${dir}
git checkout -b ${branch}
git commit
git commit
...
git push origin ${branch}
```

!SLIDE

## 開発者が増えたよ

 - コミットやプッシュは普通に行える
 - ブランチ名はissueベースで命名してます
 - Gitlabでマージリクエスト、コードレビュー、マージを行います
!SLIDE

## svnにコミットする


```bash
git pull origin master
git svn dcommit
git push -f origin master
```

!SLIDE

## svnにコミットをする

 - `git svn dcommit`をすると、svnに行ったコミットのハッシュが変わる
 - `-f`をつけてpushを行い、リポジトリを更新する

!SLIDE

## svnにコミットをする

 - submoduleを利用してはいけない
      - dcommitできない
 - `git mv`したログがあるとクラッシュすることがある
      - 再現方法不明
      - "タマに起きる"としか・・・ 


!SLIDE

## 管理者が増えたよ


```bash
git cloen ${GIT_URL} ${dir}
cd ${dir}
git svn init ${SVN_URL} --trunck=${trunk} \
--tags=${tags} --braches=${branche1} \
--branches=${branche2}
git log --pretty=format:"%H" -1 > .git/refs/remotes/trunk
git svn fetch
```


!SLIDE

## 管理者が増えたよ

 - `git svn fetch`でsvnのコミットを取得できる
 - 生成されるハッシュはgitのコミットとは対応していない
 - `.git/refs/remotes/trunk`にtrunkのHEADに対応するコミットのハッシュを記入する

!SLIDE

## どうしてこうなった

 - 政治的なアレとしか・・・
 - gitに移動するっぽい流れはある

!SLIDE

## tips,注意事項など

 - masterへのマージは`--no-ff`で
     - svn的にはブランチは無視される
     - git的にはブランチ情報が残る
 - masterの歴史の書き換えはしない
 - `git svn dcommit`,`git push -f`を一緒にやるサブコマンドを作ろうと思う
 - 名前募集


!SLIDE

## まとめ

[git-scm.orgより](http://git-scm.com/book/ja/Git%E3%81%A8%E3%81%9D%E3%81%AE%E4%BB%96%E3%81%AE%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%81%AE%E9%80%A3%E6%90%BA-Git-%E3%81%A8-Subversion)

![](hello/matome.png)