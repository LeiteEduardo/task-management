@extends('layout.app.main')
@section('page-title','Tasks')
@section('page-header')

@endsection
@section('content-title')
	<h1 class="m-3 d-flex justify-content-between align-items-center">
		<div>
			<i class="fa-solid fa-tasks"></i>
			Tasks
		</div>
	</h1>
@endsection
@section('breadcrumb')
	<li class="breadcrumb-item"><a href="{{ route('home') }}">Home</a></li>
    <li class="breadcrumb-item active">Tasks</li>
@endsection
@section('content')
<div class="row mb-3">
	<div class="col-lg-12">
		<a class="btn btn-primary btn-sm" href="{{ route('tasks.create') }}"> <i class="fas fa-plus me-2"></i>Create</a>
	</div>
</div>
<div class="row d-flex justify-content-center">
	<div class="col-lg-12">
		<div class="table-responsive">

			<table class="table table-striped table-hover table-bordered table-sm align-middle">
				<thead>
					<tr>
						<th scope="col" class="text-center">Title</th>
						<th scope="col" class="text-center">Responsible</th>
						<th scope="col" class="text-center">Status</th>
						<th scope="col" class="text-center">Start Date</th>
						<th scope="col" class="text-center">End Date</th>
						<th scope="col" class="text-center">Finish Date</th>
						<th scope="col" class="text-center">Actions</th>
					</tr>
				</thead>
				<tbody>
					@foreach( $tasks as $task )
						<tr>
							<th scope="row" class="text-center">{{ $task->title }}</th>
							<td class="text-center">
								@foreach ( $task->users as $user )
									{{ $user->name }}@if (!$loop->last) / @endif
								@endforeach
							</td>
							<td class="text-center">
								<span class="badge bg-{{$task->color}}">{{ $task->status }}</span>
							</td>
							<td class="text-center">{{ $task->getFormattedStartDate() }}</td>
							<td class="text-center">{{ $task->getFormattedEndDate() }}</td>
							<td class="text-center">{{ $task->finish_date ?? ' - ' }}</td>
							<td class="text-center">
								<a class="btn btn-success btn-sm" href="{{ route('tasks.show', $task) }}"> <i class="fas fa-eye me-2"></i> Show</a>
								<a class="btn btn-warning btn-sm" href="{{ route('tasks.edit', $task) }}"> <i class="fas fa-pen me-2"></i> Edit</a>
							</td>
						</tr>
					@endforeach
				</tbody>
			</table>
		</div>
		
		<div class="row">
			<div class="col-lg-12 d-flex justify-content-center gap-2">
				<a class="btn btn-sm btn-outline-primary @if( $tasks->onFirstPage() ) disabled @endif" href="{{ $tasks->previousPageUrl() }}"> <i class="fas fa-arrow-left me-2"></i> Previous</a>

				@for ($i = 1; $i <= $tasks->lastPage(); $i++)
					<a class="btn btn-sm btn-outline-primary @if( $i == $tasks->currentPage() ) disabled @endif" href="{{ $tasks->url($i) }}"> {{ $i }} </a>
				@endfor
			
				<a class="btn btn-sm btn-outline-primary @if( !$tasks->nextPageUrl() ) disabled @endif" href="{{ $tasks->nextPageUrl() }}"> <i class="fas fa-arrow-right me-2"></i> Next</a>
			</div>
		</div>

	</div>
</div>

@endsection
@section('page-footer')
@endsection