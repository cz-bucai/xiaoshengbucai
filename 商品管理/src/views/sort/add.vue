<template>
  <div>
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd?'添加商品':'编辑商品'"
      :visible.sync="isShow.dialogShow"
      center
    >
      <el-form :model="sortForm" :rules="rules" ref="ruleForm">

       <el-form-item prop="pid" label="上级分类：" :label-width="formLabelWidth">
          <el-select v-model="sortForm.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0">顶级分类</el-option>
            <el-option
              v-for="item in get_CateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="catename" label="分类名称：" :label-width="formLabelWidth">
          <el-input v-model="sortForm.catename"></el-input>
        </el-form-item>
        <el-form-item prop="img" label="图片" :label-width="formLabelWidth">
          <!-- 图片上传
          action 如有直接的上传服务器，把服务器地址写这，如果走接口，直接写#
          on-preview on-preview	点击文件列表中已上传的文件时的钩子
          on-remove	文件列表移除文件时的钩子
          auto-upload	是否在选取文件后立即进行上传（默认上传element官网）
          limit	最大允许上传个数
          on-exceed文件超出个数限制时的钩子	function(files, fileList)
          file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
          on-change	文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
          -->
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list='fileList'
            :on-change = 'changeInfo'
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>

        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="sortForm.status"
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
import { mapActions,mapGetters } from "vuex";
import { getCateAdd, getCateInfo, getCateEdit } from "../../util/axios";
export default {
  props: ["isShow"],
  computed: {
      ...mapGetters(['get_MenuList','get_CateList'])
  },
  data() {
    return {
      //图片的一些配置
      imgUrl:'',//长传图片的地址
      fileList:[],//文件上传列表数组
      dialogVisible: false, //是否打开图片弹框
      dialogImageUrl: "", //图片地址
      editId: 0,
      defaultChecked: [], //默认勾选的key
      formLabelWidth: "120px", //lable宽度
      sortForm: {
        pid: 0, //上级分类编号
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1,
      },
      //表单验证（根据产品需求制定）
      rules: {
        pid: [
          //代表加红色星标
          { required: true, message: "请选择上级分类", trigger: "change" },
        ],
        catename: [
          //代表加红色星标
          { required: true, message: "请输入商品名称", trigger: "blur" },
          //验证字符数
          { min: 2, max: 9, message: "长度在 2 到 9 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    //获取商品列表
    this.getCateListAction();
  },
  methods: {
     //图片移除时候的钩子函数
    handleRemove(file, fileList) {
      console.log(file, fileList, "移除触发的钩子函数");
    },
    //查看图片触发的钩子函数
    handlePreview(file) {
      console.log(file, "点击查看时候回调的钩子函数");
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //文件超出选择之后的提示
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //当上传文件图片发生变化的时候触发的函数
    changeInfo(file){
      console.log(file.raw,'文件详情')
      this.imgUrl = file.raw
    },
    //封装一个清空事件
    reset() {
      //方法一
      this.sortForm = {
        pid: 0, //上级分类编号
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1,
      };
      //重置文件上传列表
      this.fileList =[]
      //子组件关闭弹框要去修改父组件dialogShow这个数据
      this.$emit("closeDialog", false);
    },
    //触发菜单列表的调取
    ...mapActions(["getCateListAction"]),
    //点击弹框获取一条数据
    update(id) {
      this.editId = id;
      getCateInfo({ id }).then((res) => {
        if (res.code === 200) {
          console.log(res, "一条数据");
          this.sortForm = res.list;
          //对图片进行二次转化
          this.fileList = this.sortForm.img ? [{url:`${this.uploadHttp}${this.sortForm.img}`}] :[]
        }
      });
    },
    //添加表单事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
           //  this.sortForm.img = this.imgUrl
        let data = this.sortForm
        let file = new FormData()
        for(let i in data){
          file.append(i,data[i])
        }
        //转化
        file.append("img",this.imgUrl)
          console.log(this.sortForm, "分类的表单信息");
          //调取接口
          //是否调取新增事件还是编辑事件
          if (this.isShow.isAdd) {
            //调取添加接口
            getCateAdd(this.sortForm).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getCateListAction();
              }else{
                 this.$message.error(res.msg);
              }
            });
          } else {
             //id编号，必填项  对数据进行编辑
            file.append('id',this.editId)
            //调取添加接口
            getCateEdit(this.sortForm).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getCateListAction();
              }else{
                 this.$message.error(res.msg);
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
};
</script>

<style  lang="" scoped>
</style>
