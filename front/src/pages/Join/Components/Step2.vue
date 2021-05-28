<template>
  
  <b-form class="text-center modal-choose-form" style="margin-top:100px;" @submit="onSubmit" @reset="onReset" >
    
    <h3 class="mt-3 mb-5">{{ title }}</h3>
    
    <ul class="step2-ul">
      <li :key="index" v-for="(list,index) in lists">
        <b-button
        @click=openModal(index)
        @selectedList="list"
        variant="light"
        class="modal-btn">
          <span>{{ list.category }}</span> <br /> {{ list.keyword }}
        </b-button>    
      </li>
    </ul>
    
    <span class="error">{{ error }}</span>
    <Button class="mt-5" text="선택완료" />
    
    <Modal 
    @closeModal=closeModal
    v-show="modalShow" :list="lists[currentId]" :lists="lists"
    />
  
  </b-form>
  


</template>

<script>

import Modal from './Modal.vue'
import Button from '../../../shared-components/small/Button.vue'
import { checkForm } from '../../../config/validator'

export default {
    name: "Step2",
    components: {
        Modal,
        Button,
    },
    props: {
      keyList: Array
     },
    computed: {
      lists: function() {
        return this.keyList
      },
    },
    data() {
      return {
        title: '키워드를 4개 선택해주세요',
        modalShow: false,
        currentId: '',
        error: null,
      }
    },
    methods: {
      openModal(id) {
        this.modalShow = !this.modalShow
        this.currentId = id
      },
      closeModal() {
        this.modalShow = !this.modalShow
      },
      onSubmit(event) {
        event.preventDefault()
        this.error = checkForm('step2',this.lists)
        if(this.error == null) {
          this.$emit('sendFrm',this.lists)
          this.$emit('step',3)
        }
      },
      onReset(event) {
        event.preventDefault()
        for(var i in this.lists){
          this.lists[i].category = ''
          this.lists[i].ctxId = ''
          this.lists[i].keyword = ''
          this.lists[i].keyId = ''
        }
      }
    }
}
</script>
