<template>
    <div style="width:320px; margin:0 auto;">

        <h1>logo</h1>

        <b-form class="mt-5" @submit="idSubmit" @reset="idReset" v-if="search" >
            
            <h3 class="mb-2">아이디 찾기</h3>
            <b-form-input
            id="input-mailandtel"
            class="mb-2"
            v-model="formId.search"
            placeholder="이메일 혹은 연락처"
            required
            />

            <Button text="찾기" />

        </b-form>

        <div class="mt-5" v-else>

            <h3 class="mb-2">회원님의 아이디를 찾았습니다!</h3>
            <div class="pannel">
                <p>{{ findId }}</p>
            </div>

        </div>



        <b-form class="mt-5" @submit="pwdSubmit" @reset="pwdReset" >
            
            <h3 class="mb-2">비밀번호 찾기</h3>
            <b-form-input
            id="input-id"
            class="mb-2"
            v-model="formPwd.userId"
            placeholder="아이디"
            type="text"
            required
            />

            <b-form-input
            id="input-mail"
            class="mb-2"
            v-model="formPwd.email"
            placeholder="이메일주소"
            type="email"
            required
            />

            <b-link @click="pwdSubmit" class="id-link float-right">메일로 임시 비밀번호 보내기</b-link>

        </b-form>
        
        <BottomLine text="로그인 페이지로 돌아가기" url="/Login" />
   
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
        
        search: true,
        
        findId: 'mongja123',

        formId: {
          search: ''
        },
        formPwd: {
          userId: '',
          email: '',
        }
      }
    },
    methods: {
      idSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.formId))
        this.search = !this.search
      },
      idReset(event) {
        event.preventDefault()
        this.formId.search = ''
      },
      pwdSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.formPwd))
        this.$router.push('/LoginMessage/비밀번호 변경폼 url을 메일로 전송하였습니다. 확인 후 변경부탁드립니다.');
      },
      pwdReset(event) {
        event.preventDefault()
        this.formPwd.userId = ''
        this.formPwd.email = ''
      }
    }
}
</script>

<style>
    @import '../../assets/css/Login.css';
</style>