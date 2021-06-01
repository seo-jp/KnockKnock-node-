<template>
    <div>
        
        <Header
        v-if="step != 4"
        v-bind:navId="this.step"
        @step="setStep" />

         <div style="width:320px; margin:0 auto;">
          <Step0 v-show="step == 0" @step="setStep" :basicFrm="this.basic" />
          <Step1 v-show="step == 1" @step="setStep" :profileFrm="this.profile" />
          <Step2 v-show="step == 2" @step="setStep" :keyList="this.kwd" />
          <Step3 v-show="step == 3" @join="join" :keyList="this.kwd" />
          <Step4 v-show="step == 4" />
         </div>

    </div>
</template>

<script>

import Header from './Components/Header.vue'
import Step0 from './Components/Step0.vue'
import Step1 from './Components/Step1.vue'
import Step2 from './Components/Step2.vue'
import Step3 from './Components/Step3.vue'
import Step4 from './Components/Step4.vue'


export default {
    name: "JoinStep",
    components: {
        Header,
        Step0,
        Step1,
        Step2,
        Step3,
        Step4,
    },
    data() {
      return {
        step: null, //header menu
        basic: null, // step0
        profile: null, // step1
        kwd: [], // step 2-3
      }
    },
    methods: {
      // 페이지 이동 (using : header)
      setStep(i){
        this.step = i
      },
      async join() {
        //single file
        if(this.profile.file!= null && this.profile.file != undefined){
          const formData = new FormData()
          formData.append('profile', this.profile.file)
          formData.append('style', this.profile.imageStyle)
          await this.$axios.post('/api/common/fileUpload', formData, {
            header: { 'content-type': 'multipart/form-data' },
          }).then((response) => {
            this.profile.fileName = response.data.fileName
          }).catch(error=>{
            console.log(error)
            throw new Error(error)
          })
        }else {
          console.log("profile doesn't exist")
        }

        //multi file
        const formData2 = new FormData()
        let kwdChk = []
        for (var i in this.kwd) {
          if(this.kwd[i].file != null && this.kwd[i].file != undefined){
            formData2.append('ids', this.kwd[i].id)
            formData2.append('feeds', this.kwd[i].file)
            formData2.append('styles[]', this.kwd[i].imageStyle)
            kwdChk.push(this.kwd[i].id) //키워드이미지 있는경우
          }
        }

        if(kwdChk.length > 0){
          await this.$axios.post('/api/common/fileUploads', formData2, {
            header: { 'content-type': 'multipart/form-data' },
          }).then((response) => {
            for(var j in response.data){
              const rs = response.data.find(file => file.id == kwdChk[j])
              this.kwd[Number(kwdChk[j]-1)].fileName = rs.fileName
            }
          }).catch(error=>{
            console.log(error)
            throw new Error(error)
          })
        }else{
          console.log("feed doesn't exist")
        }

        //user Info

        await this.$axios.post('/api/user/join',
          {
            "basic": this.basic,
            "profile": this.profile,
            "keyList": this.kwd
          }
        ).then((response)=>{
          console.log(response)
        }).catch(error=>{
          console.log(error)
          throw new Error(error)
        })
      }
    },
    created() {
      this.step = 0
      this.basic = {
        name: null,
        userId: null,
        password: null,
        phone: null,
        email: null,
      },
      this.profile = { //file명은 따로 back단에서 저장. newFile명으로
        imageStyle: null,
        file: null,
        fileName: null,
      },
      this.kwd = [
        {
          id: 1,
          category : null,
          ctxId: null,
          keyword: null,
          keyId: null,
          imageStyle: null,
          feedText: null,
          file: null,
          fileName: null,

          zoomed: false,
          selectedImage: false,
          oldTempUrl: null,
          oldTempStyle: null,
          tempStyle: null,
          tempUrl: null
        },
        {
          id: 2,
          category : null,
          ctxId: null,
          keyword: null,
          keyId: null,
          imageStyle: null,
          feedText: null,
          file: null,
          fileName: null,

          zoomed: false,
          selectedImage: false,
          oldTempUrl: null,
          oldTempStyle: null,
          tempStyle: null,
          tempUrl: null
        },
        {
          id: 3,
          category : null,
          ctxId: null,
          keyword: null,
          keyId: null,
          imageStyle: null,
          feedText: null,
          file: null,
          fileName: null,

          zoomed: false,
          selectedImage: false,
          oldTempUrl: null,
          oldTempStyle: null,
          tempStyle: null,
          tempUrl: null
        },
        {
          id: 4,
          category : null,
          ctxId: null,
          keyword: null,
          keyId: null,
          imageStyle: null,
          feedText: null,
          file: null,
          fileName: null,

          zoomed: false,
          selectedImage: false,
          oldTempUrl: null,
          oldTempStyle: null,
          tempStyle: null,
          tempUrl: null
        }
      ]
    }
}
</script>

<style scoped>
    @import '../../assets/css/Join.css';
</style>

