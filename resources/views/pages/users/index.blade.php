@extends('layout.app.main')
@section('page-title','Home')
@section('page-header')

@endsection
@section('content-title')
	<h1 class="m-3 d-flex justify-content-between align-items-center">
		<div>
			<i class="fa-solid fa-users"></i>
			Users
		</div>
	</h1>
@endsection
@section('breadcrumb')
	<li class="breadcrumb-item"><a href="{{ route('home') }}">Home</a></li>
    <li class="breadcrumb-item active">Users</li>
@endsection
{{-- Enviando para o layout o conteudo da pagina --}}
@section('content')


@endsection
@section('page-footer')
@endsection