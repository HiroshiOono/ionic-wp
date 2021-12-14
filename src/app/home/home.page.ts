import { Component } from '@angular/core';
//import { HttpClient } from '@angular/common/http'//HTTP通信をする
import { LoadingController } from '@ionic/angular'//通信中アニメ
import { WordpressService } from '../wordpress.service';
import { IPost } from '../interfaces/post'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //HTTP通信の戻り値格納用
  /*
  posts:{
    ID: number;
    title: string;
    content: string;
    date: string;
  }[]=[];
*/
  posts: IPost[] = [];


  constructor(
    //public http: HttpClient, //HTTP通信をする
    public wordpress: WordpressService,
    public loadingController: LoadingController,//通信中アニメ
   ) {}
  

    //ページ読み込み完了時の処理
    async ionViewDidEnter(){
      //通信アニメを表示する
      const loading = await this.loadingController.create({
      message: 'Loading....',
    });
    if(!this.posts.length){
      await loading.present();//通信アニメ表示中の処理
    }
      ///URLからデータを取得し、postsへ格納
      //this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/ionicjp.wordpress.com/posts/')
      this.wordpress.getPosts()
      .subscribe(data => { 
        this.posts = data['posts'];
        loading.dismiss();//通信アニメを終了する
      });
     }

     trackByFn(index, item): number {
       return item.ID;
     }

}
