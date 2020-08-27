<template>
  <div>
    <!-- 面包屑 -->
    <el-bred></el-bred>
    <!-- 添加 -->
    <div>
      <el-button @click="openDialog" type="primary" size="mini" plain>添加</el-button>
    </div>

    <!--表格  -->
    <el-table :data="get_MenuList" border row-key="id" default-expand-all :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="菜单编号" width="80"></el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180"></el-table-column>
      <el-table-column prop="pid" label="上级菜单" width="80"></el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="180"></el-table-column>
      <el-table-column prop="url" label="菜单地址" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status ==1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作">
        <template slot-scope="item">
          <el-button type="primary" @click="edit(item.row.id)" icon="el-icon-edit" plain circle></el-button>
          <el-button type="dan ger" @click="del(item.row.id)" icon="el-icon-delete" plain circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出对话框 -->
    <el-dialog :before-close='reset' :title="isAdd?'添加菜单':'编辑菜单'" :visible.sync="dialogShow" center>
      <el-form :model="menuForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="title" label="菜单名称：" :label-width="formLabelWidth">
          <el-input v-model="menuForm.title"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="上级菜单：" :label-width="formLabelWidth">
          <el-select v-model="menuForm.pid" placeholder="请选择">
            <el-option value disabled>--请选择--</el-option>
            <el-option lable="顶级菜单" :value="0">顶级菜单</el-option>
            <el-option
              v-for="item in get_MenuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型：" :label-width="formLabelWidth">
          <el-radio v-model="menuForm.type" :label="1">目录</el-radio>
          <el-radio v-model="menuForm.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item
          v-if="menuForm.type==1"
          prop="icon"
          label="菜单图标："
          :label-width="formLabelWidth"
        >
          <el-input v-model="menuForm.icon"></el-input>
        </el-form-item>
        <el-form-item v-if="menuForm.type==2" label="菜单地址：" :label-width="formLabelWidth">
          <el-input v-model="menuForm.url"></el-input>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="menuForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reset">取 消</el-button>
        <el-button @click="add('ruleForm')" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
//引入封装接口
import { getMenuAdd,getMenuList,getMenuInfo,getMenuEdit,getMenuDel } from "../util/axios";
import elBred from "../components/elBred";
export default {
  data() {
    return {
      // options: [
      //   {
      //     value: "1",
      //     label: "系统管理",
      //   },
      //   {
      //     value: "2",
      //     label: "商城管理",
      //   },
      // ],
      editId:0,//编辑删除用
      isAdd:true,
      formLabelWidth: "120px", //lable宽度
      menuForm: {
        title: "",
        pid: 0,
        type: 1, //类型1目录2菜单
        url: "",
        status: 1,
        icon: "", 
      },
      dialogShow: false, //控制对话框的显示隐藏
      // tableData: [],
      //表单验证
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 9, message: "长度在 2 到 9 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
      },
    };
  },
  mounted() {
    // this.get_menu_list()
     this.getMenuListAction()
  },
    computed: {
    ...mapGetters(['get_MenuList'])
  },
  methods: {
    //封装打开弹框事件
    openDialog(){
      this.isAdd = true
      this.dialogShow = true
    },
    //编辑事件
    edit(id){
      this.editId = id;
      this.isAdd = false;
      getMenuInfo({id})
      .then(res=>{
        console.log(res,'一条数据');
        if(res.code==200){
          this.dialogShow = true
          this.menuForm = res.list
        }
      })
    },
      //删除事件
    del(id) {
      this.$confirm("确定要删除该数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getMenuDel({id}).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              //重新调取列表接口
              this.getMenuListAction()
            }else{
              this.$message.error(res.msg)
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //封装获取菜单列表
    ...mapActions(['getMenuListAction']),
    // get_menu_list(){
    //   getMenuList({istree:1}).then(res=>{
    //     console.log(res,'列表')
    //     if(res.code===200){
    //         this.tableData = res.list
    //     } 
    //   })
    // },
    //封装清空事件
    reset(){
       this.menuForm = {
                title: "",
                pid: 0,
                type: 1, //类型1目录2菜单
                url: "",
                status: 1,
                icon: "",
              };
              this.dialogShow = false;
    },
    //添加表单事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //调取接口
          // this.menuForm.status = this.menuForm.status ? 1 : 2

          // let data =JSON.parse(JSON.stringify(this.menuForm))
          // data.status = data.status ?1:2
          //  console.log(data,'表单信息')
          //是否调取新增事件还是编辑事件
          if(this.isAdd){
            getMenuAdd(this.menuForm).then((res) => {
            if (res.code === 200) {
              this.$message.success(res.msg);
              //关弹框
              this.reset()
              //重新获取列表
              this.getMenuListAction()
            }
          });
          }else{
            //id 必填
            this.menuForm.id = this.editId
            getMenuEdit(this.menuForm).then((res) => {
            if (res.code === 200) {
              this.$message.success(res.msg);
              //关弹框
              this.reset()
              //重新获取列表
              this.getMenuListAction()
            }
          });
          }
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  components: {
    elBred,
  },
};
</script>

<style lang="stylus" scoped>
.el-button {
  margin-bottom: 10px;
}
</style>
