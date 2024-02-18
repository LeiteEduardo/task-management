@extends('layout.app.main')
@section('page-title','Users')
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
@section('content')
<div class="row mb-3">
	<div class="col-lg-12">
		<a class="btn btn-primary btn-sm" href="{{ route('users.create') }}"> <i class="fas fa-plus me-2"></i>Create</a>
	</div>
</div>
<div class="row d-flex justify-content-center">
	<div class="col-lg-12">
		<div class="table-responsive">

			<table class="table table-striped table-hover table-bordered table-sm align-middle">
				<thead>
					<tr>
						<th scope="col" class="text-center">Name</th>
						<th scope="col" class="text-center">E-mail</th>
						<th scope="col" class="text-center">Master User</th>
						<th scope="col" class="text-center">Actions</th>
					</tr>
				</thead>
				<tbody>
					@foreach( $users as $user )
						<tr>
							<th scope="row" class="text-center">{{ $user->name }}</th>
							<td class="text-center">{{ $user->email }}</td>
							<td class="text-center">{{ $user->master->name ?? '' }}</td>
							<td class="text-center">
								<a class="btn btn-success btn-sm" href="{{ route('users.show', $user) }}"> <i class="fas fa-eye me-2"></i> Show</a>
								<a class="btn btn-warning btn-sm" href="{{ route('users.edit', $user) }}"> <i class="fas fa-pen me-2"></i> Edit</a>
							</td>
						</tr>
					@endforeach
				</tbody>
			</table>
		</div>

		<div class="row">
			<div class="col-lg-12 d-flex justify-content-center gap-2">
				<a class="btn btn-sm btn-outline-primary @if( $users->onFirstPage() ) disabled @endif" href="{{ $users->previousPageUrl() }}"> <i class="fas fa-arrow-left me-2"></i> Previous</a>

				@for ($i = 1; $i <= $users->lastPage(); $i++)
					<a class="btn btn-sm btn-outline-primary @if( $i == $users->currentPage() ) disabled @endif" href="{{ $users->url($i) }}"> {{ $i }} </a>
				@endfor
			
				<a class="btn btn-sm btn-outline-primary @if( !$users->nextPageUrl() ) disabled @endif" href="{{ $users->nextPageUrl() }}"> <i class="fas fa-arrow-right me-2"></i> Next</a>
			</div>
		</div>

	</div>
</div>

@endsection
@section('page-footer')
@endsection