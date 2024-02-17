@extends('layout.app.main')
@section('page-title','Home')
@section('page-header')
@endsection
@section('content-title')
	<h1 class="m-3 d-flex justify-content-between align-items-center">
		<div>
			<i class="fa-solid fa-users"></i>
			Show User
		</div>
	</h1>
@endsection
@section('breadcrumb')
	<li class="breadcrumb-item"><a href="{{ route('home') }}">Home</a></li>
    <li class="breadcrumb-item active"><a href="{{ route('users.index') }}">Users</a></li>
    <li class="breadcrumb-item active">Show User</li>
@endsection
@section('content')

<div class="row d-flex justify-content-center">
    <div class="col-lg-6">
        <div class="card">
            <form class="needs-validation" action="{{ route('users.destroy', $user) }}" method="POST">
                <div class="card-body">
                    @csrf
                    @method('DELETE')
                    <div class="row">
                        <div class="col-lg-12 mt-2">
                            <label class="mb-1" for="name">Name</label>
                            <input class="form-control" id="name" type="text" name="name" aria-describedby="name" value="{{ $user->name }}" readonly/>
                        </div>
                        <div class="col-lg-12 mt-2">
                            <label class="mb-1" for="email">E-mail</label>
                            <input class="form-control" id="email" type="text" name="email" aria-describedby="email" value="{{ $user->email }}" readonly/>
                        </div>
                        <div class=" @if( isset($user->master) ) col-lg-6 @else col-lg-12 @endif my-2">
                            <label class="mb-1" for="userType">User Type</label>
                            <input class="form-control" id="userType" type="text" name="userType" aria-describedby="userType" value="{{ $user->role }}" readonly/>
                        </div>
                        @if ( isset($user->master) )
                        <div class="col-lg-6 my-2">
                            <label class="mb-1" for="masterUser">Master User</label>
                            <input class="form-control" id="masterUser" type="text" name="masterUser" aria-describedby="masterUser" value="{{ $user->master->name ?? '' }}" readonly/>
                        </div>
                        @endif
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <a class="btn btn-sm btn-warning" href="{{ route('users.index') }}"> <i class="fas fa-arrow-left me-2"></i> Return</a>
                    <button class="btn btn-sm btn-danger @if( Auth::user()->id == $user->id ) disabled @endif" type="submit"> <i class="fas fa-trash me-2"></i> Delete</button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection
@section('page-footer')
@endsection