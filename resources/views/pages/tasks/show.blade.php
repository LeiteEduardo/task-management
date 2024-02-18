@extends('layout.app.main')
@section('page-title','Show Task')
@section('page-header')
@endsection
@section('content-title')
	<h1 class="m-3 d-flex justify-content-between align-items-center">
		<div>
			<i class="fa-solid fa-tasks"></i>
			Show Task
		</div>
	</h1>
@endsection
@section('breadcrumb')
	<li class="breadcrumb-item"><a href="{{ route('home') }}">Home</a></li>
    <li class="breadcrumb-item active"><a href="{{ route('tasks.index') }}">Tasks</a></li>
    <li class="breadcrumb-item active">Show Tasks</li>
@endsection
@section('content')

<div class="row d-flex justify-content-center">
    <div class="col-lg-6">
        <div class="card">
            <form class="needs-validation" action="{{ route('tasks.destroy', $task) }}" method="POST">
                <div class="card-body">
                    @csrf
                    @method('DELETE')
                    <div class="row">
                        <div class="col-lg-12 mt-2">
                            <label class="mb-1" for="title">Title</label>
                            <input class="form-control" id="title" type="text" name="title" aria-describedby="title" value="{{ $task->title }}" readonly/>
                        </div>
                        <div class="col-lg-12 mt-2">
                            <label class="mb-1" for="description">Description</label>
                            <input class="form-control" id="description" type="text" name="description" aria-describedby="description" value="{{ $task->description }}" readonly/>
                        </div>
                        <div class="col-lg-6 mt-2">
                            <label class="mb-1" for="start_date">Start Date</label>
                            <input class="form-control text-center" id="start_date" type="date" name="start_date" aria-describedby="start_date" readonly value="{{ $task->start_date }}" readonly/>
                        </div>
                        <div class="col-lg-6 mt-2">
                            <label class="mb-1" for="end_date">End Date</label>
                            <input class="form-control text-center" id="end_date" type="date" name="end_date" aria-describedby="end_date" readonly value="{{ $task->end_date }}" readonly/>
                        </div>
                        <div class="col-lg-6 mt-2">
                            <label class="mb-1" for="status">Status</label>
                            <input class="form-control text-center" id="status" type="text" name="status" aria-describedby="status" readonly value="{{ $task->status }}" readonly/>
                        </div>
                        <div class="col-lg-6 mt-2">
                            <label class="mb-1" for="finish_date">Finish Date</label>
                            <input class="form-control text-center" id="finish_date" type="text" name="finish_date" aria-describedby="finish_date" readonly value="{{ $task->finish_date ?? '-' }}" readonly/>
                        </div>
                        <div class="col-lg-12 mt-2">
                            <label class="mb-1" for="responsible">Responsible</label>
                            <select class="form-select" name="responsible" id="responsible" disabled multiple>
                                @foreach ( $task->master->regulars as $user )
                                @php
                                    $isSelected = in_array($user->id, $task->users->pluck('id')->toArray());
                                @endphp
                                <option value="{{ $user->id }}" {{ $isSelected ? 'selected' : '' }}>{{ $user->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-lg-12 mt-2">
                            <label class="mb-1" for="observation">Observation</label>
                            <textarea class="form-control" name="observation" id="" cols="30" rows="3" readonly>{{ $task->observation }}</textarea>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <a class="btn btn-sm btn-warning" href="{{ route('tasks.index') }}"> <i class="fas fa-arrow-left me-2"></i> Return</a>
                    <button class="btn btn-sm btn-danger @if( Auth::user()->role != 'master' ) disabled @endif" type="submit"> <i class="fas fa-trash me-2"></i> Delete</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script>

</script>
@endsection
@section('page-footer')
@endsection