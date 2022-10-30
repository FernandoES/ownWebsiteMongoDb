import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Observable, } from 'rxjs';
import { IBlogEntry } from 'src/app/app-user/app-user.service';
import { NotificationService } from 'src/utils/notification.service';
import { AppCreateBlogService } from './app-create-blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './app-create-blog.component.html',
  styleUrls: ['./app-create-blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-create-blog'
  }
})
export class AppCreateBlogComponent {
  @ViewChild('createBlogForm', { static: true }) createBlogForm: NgForm;

  existingArticleInformation$: Observable<IBlogEntry | null>;
  blog: IBlogEntry;
  fileReader: FileReader;
  entryId: string;
  SMALL_PICTURE_HEIGHT_PX = 100;
  imageUpdated = false;
  constructor(
    private _service: AppCreateBlogService, 
    private _notification: NotificationService, 
    private _route: ActivatedRoute, 
    private _ref: ChangeDetectorRef,
    private _imageCompress: NgxImageCompressService) {
    this.resetValues();
    this.assignExistingInformation();
    this.fileReader = new FileReader();
    this.fileReader.onload = e =>{
      let originalImage = new Image();
      originalImage.src = e.target?.result as string;
      originalImage.onload = async () => {
        const reductionRatio = originalImage.width / this.SMALL_PICTURE_HEIGHT_PX;
        if (reductionRatio > 1 ) {
          await this._imageCompress.compressFile(originalImage.src, reductionRatio)
          .then(smallPicture => this.blog.smallImage = smallPicture);
        }
        else {
          this.blog.smallImage = originalImage.src;
        }
        this.blog.image = originalImage.src;
        this.imageUpdated = true;
        this._ref.markForCheck();
      };
    };
   }
  resetForm(avoidInform: boolean = false) {
    this.resetValues();
    this.createBlogForm.form.markAsPristine();
    if(!avoidInform) { 
      this._notification.success("common.reset");
    }
  }
  resetValues(){
    this.blog = {
      ...this.blog,
      title: "",
      body: "",
      image: "",
      smallImage: ""
    }
  }

  setFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0){
      this.fileReader.readAsDataURL(target.files[0]);
    }
  }

  saveBlog() {
    if (this.entryId) {
      this._service.editBlog(this.blog, this.entryId)
      .then((response: any) => this._notification.success("editor.saved"))
      .catch((response: any) => this._notification.error(response.error.message));
    }
    else {
      this._service.saveBlog(this.blog)
      .then(() => this._notification.success("editor.saved"))
      .catch((response: any) => this._notification.error(response.error.message));
    }
  }

  assignExistingInformation() {
    this.entryId = this._route.snapshot.paramMap.get('id') as string;
    if (this.entryId) {
      this._service.fetchSingleArticle(this.entryId).then(article => {
        this.blog = article;
        this._ref.markForCheck()});
    }
  }
}
