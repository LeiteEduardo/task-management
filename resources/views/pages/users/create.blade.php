@extends('layout.app.main')
@section('page-title','Home')
@section('page-header')
@endsection
@section('content-title')
	<h1 class="m-3 d-flex justify-content-between align-items-center">
		<div>
			<i class="fa-solid fa-users"></i>
			Create User
		</div>
	</h1>
@endsection
@section('breadcrumb')
	<li class="breadcrumb-item"><a href="{{ route('home') }}">Home</a></li>
    <li class="breadcrumb-item active"><a href="{{ route('users.index') }}">Users</a></li>
    <li class="breadcrumb-item active">Create User</li>
@endsection
@section('content')

<div class="row d-flex justify-content-center">
    <div class="col-lg-6">
        <div class="card">
            <form class="needs-validation" action="{{ route('users.store') }}" method="POST">
                <div class="card-body">
                    @csrf
                    <div class="row">
                        <div class="col-lg-12 mt-2">
                            <label class="mb-1" for="name">Name</label>
                            <input class="form-control" id="name" type="text" name="name" aria-describedby="name" value="{{ old('name') }}"/>
                            <x-input-error :messages="$errors->get('name')"/>
                        </div>
                        <div class="col-lg-12 mt-2">
                            <label class="mb-1" for="email">E-mail</label>
                            <input class="form-control" id="email" type="text" name="email" aria-describedby="email" value="{{ old('email') }}"/>
                            <x-input-error :messages="$errors->get('email')"/>
                        </div>
                        <div class="col-lg-12 my-2">
                            <label class="mb-1" for="password">Password</label>
                            <input class="form-control" id="password" type="password" name="password" aria-describedby="password"/>
                            <x-input-error :messages="$errors->get('password')"/>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <a class="btn btn-sm btn-warning" href="{{ route('users.index') }}"> <i class="fas fa-arrow-left me-2"></i> Return</a>
                    <button class="btn btn-sm btn-primary" type="submit"> <i class="fas fa-check me-2"></i> Confirm</button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection
@section('page-footer')
@endsection