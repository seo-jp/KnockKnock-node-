<template>
  <form class="text-center" style="margin-top:100px;" enctype="multipart/form-data" @submit="onSubmit" @reset="onReset" >
            
            <div v-show="selectedImage == false" >
              
              <div
              class="profile profile1"
              @click="onClickImageUpload">
                <img :src="tempUrl" :style="tempStyle">
              </div>

              <input
              ref="profileFile"
              class="imageInput"
              type="file"
              hidden
              @change="onChangeImages"
              accept="image/*"
              >
              <a
              v-show="tempUrl != basicUrl"
              class="step1-a"
              @click="onReset"
              >기본사진</a>

            
            </div>

            <div v-show="selectedImage">
            
              <v-zoomer
              ref="zoomer"
              class="profile"
              :max-scale="10"
              :zooming-elastic="false"
              :zoomed.sync="zoomed"
              >
              <img :src="tempUrl" class="profile-img">
              </v-zoomer>

              <a
              class="step1-a"
              @click="onCancel"
              >취소</a>
              
              <a
              class="step1-a"
              @click="getStyle"
              >확인</a>
            
            </div>
            
            <span class="error">{{ error }}</span>
            <Button v-show="selectedImage == false" class="mt-5" style="margin-top:100px" text="선택완료" />

  </form>
</template>

<script>

import Button from '../../../shared-components/small/Button.vue'
import { checkForm } from '../../../config/validator'
import { setProfilePosition } from '../../../config/position'

export default {
    name: "Step1",
    components: {
        Button,
    },
    props: {
      profileFrm: Object
     },
    computed: {
      form: function() {
        return this.profileFrm
      }
    },
    data() {
      return {
        basicUrl: require('../../../assets/img/basicProfile.png'), //기본 프로필사진
        
        selectedImage: false, //이미지 선택 - 줌 옵션
        zoomed: false, // 줌 옵션

        oldTempUrl: null, // 취소대비 전 임시정보
        oldTempStyle: null, // 취소대비 전 임시정보
        tempStyle : null, // 임시정보
        tempUrl : null, // 임시정보

        error : null // 에러메세지
      }
    },
    created() {
      this.tempUrl = this.basicUrl
      this.oldTempUrl = this.basicUrl
    },
    methods: {

      // 확인 클릭 시 임시정보를 전임시정보에 저장 (다음작업 시 취소기능을 위해)
      // 확인 클릭 시 임시정보에 확인한 스타일 저장 후 selectedImage = false로 옵션변경
      // 확인 클릭 시 zoomer reset해주기 (안그러면 다음작업시 전 스케일정보 남아있음)
      getStyle() {
        this.tempStyle = "object-fit: contain; width: 100%; height: 100%; transform:" 
                        + document.querySelector(".zoomer").style.transform
        this.selectedImage = !this.selectedImage

        this.oldTempUrl = this.tempUrl
        this.oldTempStyle = this.tempStyle

        this.$refs.zoomer.reset()
      },
      // 이미지 등록버튼 클릭 시 파일선택기능
      // 어떤 경우든 change가능하게 file value 지워주기
      onClickImageUpload() {
        this.$refs.profileFile.value = null
        this.$refs.profileFile.click()
      },
      // 이미지 선택 시 selectedImage = true로 옵션변경 (줌 작업가능)
      // 이미지 선택 시 임시정보에 URL 저장
      onChangeImages(e) {
        const file = e.target.files[0]
        if(file != null && file != ''){
          this.selectedImage = !this.selectedImage
          this.tempUrl = URL.createObjectURL(file)
          this.form.file = file
        }
      },
      // 취소 시 전 임시정보 불러서 셋팅
      // 어떤 경우든 change가능하게 file value 지워주기
      onCancel() {
        this.selectedImage = !this.selectedImage
        this.tempUrl = this.oldTempUrl
        this.tempStyle = this.oldTempStyle
        this.$refs.profileFile.value = null
        this.$refs.zoomer.reset()
      },
      // 폼 저장
      onSubmit(e) {
        e.preventDefault()
        //기본프로필이 아닐때만
        if(this.tempStyle != null) {
          this.error = checkForm('step1',document.querySelector(".imageInput").value)
          
          this.form.imageStyle = setProfilePosition()
          
          if(this.error == null) this.$emit('step',2)
        } else {
          this.$emit('step',2)
        }
        
      },
      // 기본이미지 사용
      // 어떤 경우든 change가능하게 file value 지워주기
      onReset() {
        this.$refs.profileFile.value = null
        this.tempStyle = null
        this.tempUrl = this.basicUrl

        this.oldTempUrl = this.basicUrl
        this.oldTempStyle = null
        
        this.zoomed = false
        this.selectedImage = false
      }
    }
}
</script>
