<template>
    <b-form class="text-center" style="margin-top:100px;" @submit="onSubmit">
            
      <div :key="index" v-for="(list,index) in keyList">
            
            <h4 class="text-left mb-3">{{ list.category }} / {{ list.keyword }}</h4>
            
            <div v-show="list.selectedImage == false" >
              
              <div
              :id="index"
              class="feed feed1"
              @click="onClickImageUpload(index)">
                <img :src="list.tempUrl" :style="list.tempStyle" class="feedImg">
              </div>
              
              <a
              v-show="list.tempUrl != basicUrl"
              class="step1-a"
              @click="onReset(index)"
              >기본사진</a>
              
              <input
              ref="feedFile"
              class="imageInput"
              accept="image/*" 
              :id="index" 
              type="file"
              multiple  
              hidden 
              @change="onChangeImages">
            
            </div>

            <div v-show="list.selectedImage">
              <v-zoomer
              ref="zoomer"
              class="feed"
              :max-scale="10"
              :zooming-elastic="false"
              :zoomed.sync="list.zoomed"
              >
              <img :src="list.tempUrl" class="feed-img">
              </v-zoomer>              
              
              <a
              class="step1-a"
              @click="onCancel(index)"
              >취소</a>
              
              <a
              class="step1-a"
              @click="getStyle(index)"
              >확인</a>

            </div>

            <div>
              <b-form-textarea
              v-model="list.feedText"
              placeholder="소개글을 입력해주세요."
              rows="3"
              max-rows="3"
              class="mt-2 mb-4"
              style="overflow-y:hidden!important;"
              ></b-form-textarea>
            </div>

      </div>
            
            <span class="error">{{ error }}</span>
            <Button class="mt-5" text="선택완료" />

  </b-form>
</template>

<script>

import Button from '../../../shared-components/small/Button.vue'
import { checkForm } from '../../../config/validator'
import { setFeedPosition } from '../../../config/position'

export default {
    name: "Step3",
    components: {
        Button,
    },
    props: {
      keyList: Array
     },
    computed: {
      lists: function() {
        return this.keyList
      }
    },
    data() {
      return {
        basicUrl : require('../../../assets/img/basicFeed.png'), //기본 피드사진
        files: [null, null, null, null],
        error : null // 에러메세지
      }
    },
    created() {
      for(var i in this.lists) {
        this.lists[i].tempUrl = this.basicUrl
        this.lists[i].oldTempUrl = this.basicUrl
      }
    },
    methods: {
      getStyle(i) {
        this.lists[i].tempStyle = "object-fit: contain; height: 100%; transform:" 
                        + document.querySelectorAll(".zoomer")[i+1].style.transform
        this.lists[i].selectedImage = !this.lists[i].selectedImage

        this.lists[i].oldTempUrl = this.lists[i].tempUrl
        this.lists[i].oldTempStyle = this.lists[i].tempStyle

        this.lists[i].file = this.files[i]
        this.$refs.zoomer[i].reset()
      },
      onClickImageUpload(i) {
        this.$refs.feedFile[i].value=null;
        this.$refs.feedFile[i].click()
      },
      onChangeImages(e) {
        const i = e.target.id
        const file = e.target.files[0]
        if(file != null && file != ''){
          this.lists[i].selectedImage = !this.lists[i].selectedImage
          this.lists[i].tempUrl = URL.createObjectURL(file)
          this.files[i] = file
        }
      },
      onCancel(i) {
        this.lists[i].selectedImage = !this.lists[i].selectedImage
        this.lists[i].tempUrl = this.lists[i].oldTempUrl
        this.lists[i].tempStyle = this.lists[i].oldTempStyle
        this.$refs.zoomer[i].reset()
        this.$refs.feedFile[i].value=null;
      },
      onSubmit(e) {
        e.preventDefault()

        let imgs = []
        
        for(var j in this.lists)
          if(this.lists[j].file != null && this.lists[j].file != '')
            imgs.push(this.lists[j].file.name)
        
        this.error = checkForm('step3',imgs)
        
        if(this.error == null){
          for(var k in this.lists)
            if(this.lists[k].tempStyle != null) 
              this.lists[k].imageStyle = setFeedPosition(k)

          this.$emit('join')
        } 
      },
      onReset(i) {
        this.$refs.feedFile[i].value=null
        this.files[i] = null

        this.lists[i].file = null
        this.lists[i].imageStyle = null
       
        this.lists[i].tempStyle = null
        this.lists[i].tempUrl = this.basicUrl

        this.lists[i].oldTempUrl = this.basicUrl
        this.lists[i].oldTempStyle = null
        
        this.lists[i].zoomed = false
        this.lists[i].selectedImage = false
      }
    },
}
</script>
