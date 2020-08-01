<template>
  <transition name="slider">
    <div class="modal" v-show="showModal">
      <div class="mask"></div>
      <div class="modal-dialog">
        <div class="modal-header">
          <span>{{title}}</span>
          <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <div class="btn-group">
            <a
              href="javascript:;"
              class="btn"
              v-show="(btnType===1) || (btnType===2)"
              @click="$emit('confirm')"
            >{{confirmText}}</a>
            <a
              href="javascript:;"
              class="btn default-btn"
              v-show="(btnType===1) || (btnType===3)"
              @click="$emit('cancel')"
            >{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    // 弹窗类型： samll小的，middle中的，large大的，form表单
    modalType: {
      type: String,
      default: 'form'
    },
    title: {
      type: String,
      default: ''
    },
    // 1:确认取消 2：确认 3.取消
    btnType: {
      type: Number,
      default: 1
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showModal: {
      type: Boolean,
      default: false
    }
  },
  components: {

  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';
@import '../assets/scss/button.scss';
@import '../assets/scss/modal.scss';
</style>
