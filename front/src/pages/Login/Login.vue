<template>
    <div style="width:320px; margin:0 auto;">
        
        <h1>logo</h1>

        <b-form class="mt-5" @submit="onSubmit" @reset="onReset" >

            <b-form-input
            id="input-id"
            class="mb-2"
            v-model="form.userId"
            placeholder="아이디"
            required
            />

            <b-form-input
            id="input-pwd"
            class="mb-3"
            v-model="form.password"
            placeholder="비밀번호"
            type="password"
            required
            />

             <span class="error text-center">{{ setErr }}</span>

            <Button text="로그인" />

            <b-form-checkbox
            v-model="rememberId"
            class="mb-2 mr-sm-2 mb-sm-0 chk-box float-left">
            아이디 저장
            </b-form-checkbox>
            <b-link href="/LoginSearch" class="id-link float-right">아이디 및 비밀번호를 잊으셨나요?</b-link>

        </b-form>

        <BottomLine text="계정이 없으신가요?" url="/JoinStep" point="가입하기" />

    </div>
</template>

<script>

import Button from '../../shared-components/small/Button.vue'
import BottomLine from '../../shared-components/small/BottomLine.vue'


export default {
    name: "Login",
    components: {
        Button,
        BottomLine,
    },
    data() {
      return {
        form: {
          userId: '',
          password: ''
        },
        rememberId: '',
        setErr: null,
      }
    },
    created() {
      this.getCookieId()
    },
    methods: {
      // rememberId
      getCookieId() {
        if(this.$cookie.get('userId') !== null && this.$cookie.get('userId') !== undefined){
          this.form.userId = this.$cookie.get('userId')
          this.rememberId = true
        }
      },
      // login
      async onSubmit(e) {
        e.preventDefault()
        await this.$axios.post('/api/user/login',
          {"userInfo": this.form}
        ).then((res)=>{
          if(res.data.success == false)
            this.setErr = res.data.msg
          else{
            this.setErr = null
            if(this.rememberId == true)
              this.$cookie.set('userId', this.form.userId, 10000)
            else if(this.rememberId == false && this.$cookie.get('userId') !== null && this.$cookie.get('userId') !== undefined)
              this.$cookie.delete('userId')
          }
        }).catch(error=>{
          throw new Error(error)
        })
      },
      onReset(e) {
        e.preventDefault()
        this.form.email = ''
        this.form.name = ''
        this.form.rememberId = ''
      }
    }
}
</script>

<style>
    @import '../../assets/css/Login.css';
</style>
