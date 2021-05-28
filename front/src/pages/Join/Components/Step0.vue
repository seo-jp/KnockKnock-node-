<template>
    <div>
        
        <div>
        <b-form class="mt-5" @submit="onSubmit" @reset="onReset" >

            <h3 class="mb-2">유저 정보 작성</h3>
            
            <b-form-input
            id="input-name"
            class="mb-2"
            v-model="form.name"
            placeholder="이름"
            type="text"
            required
            />

            <b-form-input
            id="input-id"
            class="mb-2"
            v-model="form.userId"
            placeholder="사용자 ID"
            type="text"
            required
            />

            <span class="error">{{ dupChkId }} {{ setErr1 }}</span>

            <b-form-input
            id="input-pwd"
            class="mb-2"
            v-model="form.password"
            placeholder="비밀번호"
            type="password"
            required
            />

            <b-form-input
            id="input-tel"
            class="mb-2"
            v-model="form.phone"
            placeholder="연락처"
            type="tel"
            required
            />

            <span class="error">{{ dupChkTel }} {{ setErr2 }}</span>

            <b-form-input
            id="input-mail"
            class="mb-3"
            v-model="form.email"
            placeholder="이메일"
            type="email"
            required
            />

            <span class="error">{{ dupChkMail }} {{ setErr3 }}</span>

            <span class="error">{{ error }}</span>
            <Button text="입력완료" />

        </b-form>

        <BottomLine text="로그인 페이지로 돌아가기" url="/Login" />
        </div>

    </div>
</template>

<script>

import Button from '../../../shared-components/small/Button.vue'
import BottomLine from '../../../shared-components/small/BottomLine.vue'
import { checkForm} from '../../../config/validator'

export default {
    name: "Step0",
    components: {
        Button,
        BottomLine,
    },
    props: {
      basicFrm: Object
     },
     data() {
      return {
        setErr1 : null,
        setErr2 : null,
        setErr3 : null
      }
    },
    computed: {
      form: function() {
        return this.basicFrm
      },
      error: function() {
        return checkForm('step0',this.form)
      },
      dupChkId: function() {
        return this.checkDupliId(this.form.userId)
      },
      dupChkTel: function() {
        return this.checkDupliTel(this.form.phone)
      },
      dupChkMail: function() {
        return this.checkDupliMail(this.form.email)
      }
    },
    methods: {
      checkDupliId(userId) {
        this.$axios.get(`/api/common/validate/dupliIdChk/${userId}`)
            .then((response) => {
                if(response.data[0].result == 1)
                  this.setErr1 = "이미 존재하는 아이디입니다"
                else
                  this.setErr1 = null
        })
      },
      checkDupliTel(tel) {
        this.$axios.get(`/api/common/validate/dupliPhoneChk/${tel}`)
            .then((response) => {
                if(response.data[0].result == 1)
                  this.setErr2 = "이미 존재하는 연락처입니다"
                else
                  this.setErr2 = null
        })
      },
      checkDupliMail(mail) {
        this.$axios.get(`/api/common/validate/dupliMailChk/${mail}`)
            .then((response) => {
                if(response.data[0].result == 1)
                  this.setErr3 = "이미 존재하는 이메일입니다"
                else
                  this.setErr3 = null
        })
      },
      onSubmit(event) {
        event.preventDefault()
        if(this.error == null && this.setErr1 == null &&
           this.setErr2 == null && this.setErr3 == null) {
          this.$emit('sendFrm',this.form)
          this.$emit('step',1)
        }
      },
      onReset(event) {
        event.preventDefault()
        this.form.name = ''
        this.form.userId = ''
        this.form.password = ''
        this.form.phone = ''
        this.form.email = ''
      },
    }
}
</script>

