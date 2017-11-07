import NoContainer from '../../base/noContainer/noContainer'
import { uploadPromise, uploadFile } from '../../assets/js/getUpload'
import { mapGetters } from 'vuex'
export const pageCommon = {
  data() {
    return {
      pageSizeArray: [5, 10, 15, 20],
      pageNo: 1,
      pageSize: 5,
      pageTotal: null,
      loadingList: false
    }
  },
  components: {
    NoContainer
  },
  mounted() {
    this.getTask()
  },
  watch: {
    pageSize(newVal, oldVal) {
      if (this.pageTotal > newVal) {
        this.getTask()
        return false
      }
      if (this.pageTotal < oldVal) {
        return false
      }
      this.getTask()
    }
  },
  methods: {
    //修改每页显示的数据数目
    handleSizeChange(val) {
      this.pageSize = val
        // if (this.pageTotal > val) {
        //   return false
        // }
    },
    //设置pageNo
    handleCurrentChange(val) {
      this.pageNo = val
      this.getTask()
    },
    //查看数据api
    getTask() {
      this.loadingList = true
      this.$ajax.post(this.apiUrl, this.params).then((response) => {
        this.loadingList = false
        let mydata = response.data
        if (mydata.code === '200') {
          this.pageTotal = mydata.data.total || mydata.totalCount || mydata.data.totalCount
          let myDatas = mydata.data.datas || mydata.data.userAccountDOList
          this.setList(myDatas)
        } else {
          this.$message.error(mydata.message)
        }
      }).catch((error) => {
        console.log(error)
        this.$message.error('网络错误，刷新下试试')
      })
    },
  }
};
//日期修改
export const dataChange = {
  data() {
    return {
      valueTime: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      startTime: null,
      endTime: null,
    }
  },
  methods: {
    //选择
    toggleSelection(rows) {
      if (rows.length >= 1) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, true)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    //更改
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //设置起始时间
    timeChange(val) {
      let times = val.split('至')
      this.startTime = times[0]
      this.endTime = times[1]
      this.getTask() //日期修改触发时间
    },
  }
};
//表格公用
export const tableCommon = {
  data() {
    return {
      tableData: [],
      multipleSelection: []
    }
  },
  computed: {
    charge() {
      let num = 0
      for (let i in this.multipleSelection) {
        num += parseInt(this.multipleSelection[i].charge)
      }
      return num
    },
    alatolCount() {
      let num = 0
      for (let i in this.multipleSelection) {
        num += parseInt(this.multipleSelection[i].realMoney)
      }
      return num
    }
  },
  methods: {
    getTaskBefore() {
      this.getTask()
    }
  }
};
//表格操作公用
export const tableOperate = {
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    //单独确认事件
    sureGetCoin(title, index, row) {
      const h = this.$createElement
      this.$msgbox({
        title: title,
        message: h('div', null, [
          h('p', null, [
            h('span', null, '手续费： '),
            h('i', { style: 'color: red' }, row.charge)
          ]),
          h('p', null, [
            h('span', null, '实际金额 '),
            h('i', { style: 'color: red' }, row.realMoney)
          ])
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            this.sendOneApi(row).then((res) => {
              let mydata = res.data
              instance.confirmButtonLoading = false
              if (mydata.code === '200') {
                instance.confirmButtonText = '执行成功'
                this.$message({
                  message: '操作成功！',
                  type: 'success'
                })
                done()
                this.getTask()
              } else {
                instance.confirmButtonText = '再试一次'
                this.$message.error(mydata.message)
              }
            }).catch((err) => {
              console.log(err)
              this.$message.error('网络错误')
            })
          } else {
            done()
          }
        }
      })
    },
    //单个
    sendOneApi(row) {
      return new Promise((resolove, reject) => {
        this.$ajax.post(this.oneSureUrl, {
          withdrawId: row.withdrawId,
          operateUserId: this.userInfo.operateUserId
        }).then((response) => {
          resolove(response)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    //批量确认
    allSure(title) {
      if (this.multipleSelection.length) {
        const h = this.$createElement
        this.$msgbox({
          title: title,
          message: h('div', null, [
            h('p', null, [
              h('span', null, '手续费： '),
              h('i', { style: 'color: red' }, this.charge)
            ]),
            h('p', null, [
              h('span', null, '实际金额 '),
              h('i', { style: 'color: red' }, this.alatolCount)
            ])
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              this.sendAllApi().then((res) => {
                let mydata = res.data
                instance.confirmButtonLoading = false
                if (mydata.code === '200') {
                  instance.confirmButtonText = '执行成功'
                  this.$message({
                    message: '操作成功！',
                    type: 'success'
                  })
                  done()
                  this.getTask()
                } else {
                  instance.confirmButtonText = '再试一次'
                  this.$message.error(mydata.message)
                }
              }).catch((err) => {
                console.log(err)
                this.$message.error('网络错误')
              })
            } else {
              done()
            }
          }
        })
      } else {
        this.$message({
          message: '至少选择一条数据',
          type: 'warning'
        })
      }
    },
    //发送api
    sendAllApi() {
      return new Promise((resolove, reject) => {
        let withdrawIds = []
        this.multipleSelection.forEach(row => {
          withdrawIds.push(row.withdrawId)
        })
        this.$ajax.post(this.allSureUrl, {
          withdrawIds: withdrawIds,
          operateUserId: this.userInfo.operateUserId
        }).then((response) => {
          resolove(response)

        }).catch((error) => {
          reject(error)
        })
      })
    },
    // 撤销任务数据填写
    notGetCoin(index, row) {
      this.$prompt('请输入撤销理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '撤销理由',
        inputPattern: /\S/,
        inputErrorMessage: '撤销任务不能为空'
      }).then(({ value }) => {
        this.doNotGetCoin(row, value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    //提交撤销任务
    doNotGetCoin(row, value) {
      this.$ajax.post(this.notUrl, {
        withdrawId: row.withdrawId,
        operateUserId: this.userInfo.operateUserId,
        comment: value
      }).then((response) => {
        let mydata = response.data
        if (mydata.code === '200') {
          this.$message({
            message: '操作成功！',
            type: 'success'
          })
          this.getTask()
        } else {
          this.$message.error(mydata.message);
        }
      }).catch((error) => {
        this.$message.error('网络错误，刷新下试试');
      })
    }
  }
};
//商品信息公用
export const sellInfoOperate = {
  data() {
    return {
      isShow: true
    }
  },
  methods: {
    changeShow() {
      this.isShow = !this.isShow
    },
    getInfo() {
      this.$ajax.post(this.apiUrl, {
        taskId: this.$route.query.sellerTaskId
      }).then((response) => {
        let myData = response.data
        if (myData.code === '200') {
          this.setInfo(myData.data)
        } else {
          this.$message.error(myData.message)
        }
      }).catch((error) => {
        console.log(error)
        this.$message.error('网络错误，刷新下试试')
      })
    },
  },
  mounted() {
    this.getInfo()
  },
};
//任务撤销
export const taskStop = {
  data() {
    return {
      dialogTableVisible: false,
      uploadImgUrl: '',
    }
  },
  methods: {
    //撤销任务
    giveUp(taskId, type) {
      this.dialogTableVisible = true
      this.giveUpTaskId = taskId
      this.stopOrGiveUp = type
    },
    // 确定撤销
    sureGiveUp() {
      if (!this.uploadImgUrl) {
        this.$message({
          showClose: true,
          message: '请上传图片',
          type: 'error'
        })
      } else {
        let apiUrl
        if (this.stopOrGiveUp === 1) {
          apiUrl = '/api/manage/task/undoTask'
        } else {
          apiUrl = '/api/manage/task/stopTask'
        }
        this.$ajax.post(apiUrl, {
          taskId: this.giveUpTaskId,
          picUrl: this.uploadImgUrl,
          operateUserId: this.userInfo.operateUserId
        }).then((response) => {
          console.log(response)
          let myData = response.data
          if (myData.code === '200') {
            this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success'
            })
            this.dialogTableVisible = false
              // this.getTask()
            this.updateState()
          } else {
            this.$message({
              showClose: true,
              message: myData.message,
              type: 'warning'
            })
          }
        }).catch((error) => {
          this.$message({
            showClose: true,
            message: '网络错误',
            type: 'error'
          })
        })
      }
    },
    // 取消撤销
    addGiveUp() {
      this.dialogTableVisible = false
      this.uploadImgUrl = ''
      this.$refs.uploadImg.clearFiles()
    },
    // 自定义上传方法
    uploadImg(img) {
      uploadPromise.then((res) => {
        let myData = res.data
        if (myData.code === '200') {
          uploadFile(myData.data, img.file).then((res) => {
            this.uploadImgUrl = res.url
          }).catch((err) => {
            this.$message.error('网络错误，请刷新试试')
          })
        }
      }).catch((err) => {
        this.$message.error('网络错误，请刷新试试')
      })
    },
    // 删除上传
    removeImg() {
      this.uploadImgUrl = ''
    },
    // 上传图片前做判断
    beforeUpload(file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png');
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG,PNG 格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isJPG && isLt1M;
    },
  }
}