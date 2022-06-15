<template>
  <div class="box">
    <div>
      <img alt="Vue logo" src="https://edu.metastudy.vip/mt/images/mxmt-05_banner.jpg"/>
      <div class="clickTo" @click="scollTo">
        <img
            src="http://pic.soutu123.com/element_pic/01/38/85/93573c9b4f5faf1.jpg!/fw/245/quality/90/unsharp/true/compress/true"
            alt=""/>
      </div>
      <slide/>
    </div>
    <div class="boxSelect">
      <a-form class="label" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol"
              :validate-messages="validateMessages">
        <a-form-item class="label-item" label="1.下面哪个是建模的软件？">
          <a-radio-group v-model:value="formState.form">
            <a-radio value="1">Excel</a-radio>
            <a-radio value="2">3Dsmax</a-radio>
            <a-radio value="3">Photoshop</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="2.以下哪个游戏是3D游戏？">
          <a-radio-group v-model:value="formState.game">
            <a-radio value="1">王者荣耀</a-radio>
            <a-radio value="2">英雄联盟</a-radio>
            <a-radio value="3">绝地求生</a-radio>
            <a-radio value="4"> 以上均可</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="3.下面哪个建模你觉得最难？">
          <a-radio-group v-model:value="formState.selectType">
            <a-radio value="1">人物建模<img src="./assets/选项_人物建模.gif" alt=""/></a-radio>
            <a-radio value="2">道具建模<img src="./assets/选项_道具建模.gif" alt=""/></a-radio>
            <a-radio value="3">场景建模<img src="./assets/选项_场景建模.gif" alt=""/></a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="4.年龄（根据年龄匹配课程）" :rules="[{ required: true}]">
          <a-radio-group v-model:value="formState.age">
            <a-radio value="1">17岁以下</a-radio>
            <a-radio value="2">18-20岁</a-radio>
            <a-radio value="3">21-24岁</a-radio>
            <a-radio value="4">25-30岁</a-radio>
            <a-radio value="5">31-40岁</a-radio>
            <a-radio value="6">41岁以上</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="5.您的手机号码是？（48小时内有老师联系发放课程和资料，请留意短信）" :rules="[{ required: true}]">
          <a-input v-model:value="formState.phone" type="textarea" placeholder="请输入手机号码(已做二级加密)"/>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button id="show" class="button" type="primary" @click="onSubmit">提交</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import {reactive, toRaw, onMounted, ref} from 'vue';
import {message} from 'ant-design-vue';
import {apiGetUserInfo} from './api/api'
import slide from './components/slide.vue'

components: {
  slide
}
const top = ref(false)
const formState = reactive({
  delivery: false,
  type: [],
  form: '',
  game: '',
  selectType: '',
  age: '',
  phone: '',
});
const validateMessages = {
  required: '${label} 不能为空！',
};

const scollTo = () => {
  let scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
  if (scrollTop === 0) {
    document.getElementById("show").scrollIntoView({behavior: 'smooth'});
  } else {
    return;
  }
}

const onSubmit = () => {
  console.log('submit!', toRaw(formState));
  if (formState.form === '') {
    return message.warning('选项1不能为空');
  }
  if (formState.game === '') {
    return message.warning('选项2不能为空');
  }
  if (formState.selectType === '') {
    return message.warning('选项3不能为空');
  }
  const reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
  if (reg.test(formState.phone)) {
    return true;
  } else {
    return message.warning('选项5不能为空');
  }

  function getUserInfo() {
    const param = {
      "formStr": "Excel,绝地求生,人物建模,17岁以下",
      "phone": "11111111111",
      "empName": "做题者姓名"
    }
    apiGetUserInfo().then((res) => {
      if (res.data.code == 1) {
        message.success('提交成功');
      } else if (res.data.code == 2) {
        message.info('数据库连接异常');
      } else if (res.data.code == 3) {
        message.info('提交失败');
      } else if (res.data.code == 4) {
        message.info('请不要输入异常字符');
      }

    })
  }

  onMounted(() => {
    getUserInfo()
  })
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.boxSelect {
  width: 60%;
  margin: 40px auto;
}

button {
  width: 100%;
  margin: 20px 0;
}

.clickTo {
  margin: 0 auto;
  text-align: center;
}

.clickTo img {
  width: 200px;
  height: 200px;
  margin-top: -200px;
  z-index: 9999;
  object-fit: cover;
}
</style>
