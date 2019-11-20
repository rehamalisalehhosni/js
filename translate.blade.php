@extends('admin::layouts.master')

@section('page_title')
{{ __('admin::app.dashboard.title') }}
@stop

@section('content-wrapper')


<?php
    $content = file_get_contents(base_path().'/composer.json');
    $content = json_decode($content,true);
    //
    // var_dump($content['autoload']['psr-4']);die();
    // die('d');
    //
    $dir_lang=[];
    foreach ($content['autoload']['psr-4'] as $key => $path) {
      // code...
      $directories = glob(base_path().'/'.$path.'/Resources/lang' , GLOB_ONLYDIR);
      if(!empty($directories)){
        $dir_lang[$key]    =base_path().'/'.$path.'/Resources/lang';
      }
    }

?>
<div id="tran">
  <div class="control-group">
    <select class="control" id="locale-switcher" >
      @foreach (core()->getAllLocales() as $localeModel)
      <option value="{{ $localeModel->code }}">
        {{ $localeModel->name }}
      </option>
      @endforeach
    </select>

    <select name="LeaveType" id="lang_file" @change="onChangeLang()" class="control">
      @foreach ($dir_lang as $key => $path)
      <option value="{{$key}}" >   {{$key}}  </option>
      @endforeach
    </select>
  </div>


  <template>
    <v-jsoneditor ref="editor" v-model="json" @error="onError"></v-jsoneditor>
    <p>@{{ json }}</p>
    <button type="button" @click="onClick">get</button>
  </template>
</div>

@stop

@push('scripts')
<script src="{{ asset('vendor/v-jsoneditor.min.js') }}"></script>

<script>
var data_translate=<?php echo json_encode($data_translate,JSON_PRETTY_PRINT) ?>;
var cur=$('#locale-switcher').val();
var file_key=$('#lang_file').val();
var data={"hello": "vue"};


function getData(){
    cur=$('#locale-switcher').val();
   file_key=$('#lang_file').val();


  for(var i in data_translate){
    if(data_translate[i]['locale']==cur&&data_translate[i]['package']==file_key){
      data=JSON.parse(data_translate[i]['json']);
      return data;
    }
  }

}
data=getData();
var Main = {
  name: 'test',
  data() {
    return {
      json: data
    }
  },
  methods: {
    onError(err){
      console.log(err)
    },
    onClick () {
      console.log(this.$refs.editor.editor.get())
    },
    onChangeLang(){
      console.log(this.$refs.editor.editor);
      console.log($('#locale-switcher').val());

      console.log($('#lang_file').val());
      console.log(data);
      data=getData();
     this.$refs.editor.editor.update(data);
    }
  },
};
var Ctor = Vue.extend(Main)
new Ctor().$mount('#tran')
</script>

@endpush
