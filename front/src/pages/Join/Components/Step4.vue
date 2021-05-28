<template>
    <div>
      <p class="step4-p">
        축하합니다!
        <br />
        회원가입이 완료되었습니다
        <br />
        이제 본격적으로 <span>KNOCKKNOCK</span>을
        <br />
        즐기러 가볼까요?
      </p>

      <BottomLine text="로그인 페이지로 돌아가기" url="/Login" />
    </div>
</template>

<script>

import BottomLine from '../../../shared-components/small/BottomLine.vue'

export default {
    name: "Step4",
    components: {
        BottomLine,
    }
}
</script>

<style>
    @import '../../../assets/css/Login.css';
</style>
