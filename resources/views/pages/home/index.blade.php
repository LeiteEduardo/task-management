@extends('layout.app.main')
@section('page-title','Home')
@section('page-header')

@endsection
@section('content-title')
	<h1 class="m-3 d-flex justify-content-between align-items-center">
		<div>
			<i class="fa-solid fa-home"></i>
			Home
		</div>
	</h1>
@endsection
@section('breadcrumb')
	<li class="breadcrumb-item active">Home</li>
@endsection
{{-- Enviando para o layout o conteudo da pagina --}}
@section('content')


@endsection
@section('page-footer')
@endsection