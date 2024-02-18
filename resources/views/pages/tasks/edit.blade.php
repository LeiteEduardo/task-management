@extends('layout.app.main')
@section('page-title','Edit Task')
@section('page-header')
@endsection
@section('content-title')
	<h1 class="m-3 d-flex justify-content-between align-items-center">
		<div>
			<i class="fa-solid fa-tasks"></i>
			Edit Task
		</div>
	</h1>
@endsection
@section('breadcrumb')
	<li class="breadcrumb-item"><a href="{{ route('home') }}">Home</a></li>
    <li class="breadcrumb-item active"><a href="{{ route('tasks.index') }}">Tasks</a></li>
    <li class="breadcrumb-item active">Edit Tasks</li>
@endsection
@section('content')

<div class="row d-flex justify-content-center">
    <div class="col-lg-6">
        <div class="card">
            <form class="needs-validation" action="{{ route('tasks.update', $task) }}" method="POST">
                <div class="card-body">
                    @csrf
                    @method('PUT')
                    <div class="row">
                        <div class="col-lg-12 mt-2">
                            <label class="mb-1" for="title">Title</label>
                            <input class="form-control" id="title" type="text" name="title" aria-describedby="title" value="{{ $task->title }}"/>
                            <x-input-error :messages="$errors->get('title')"/>
                        </div>
                        <div class="col-lg-12 mt-2">
                            <label class="mb-1" for="description">Description</label>
                            <input class="form-control" id="description" type="text" name="description" aria-describedby="description" value="{{ $task->description }}"/>
                            <x-input-error :messages="$errors->get('description')"/>
                        </div>
                        <div class="col-lg-6 mt-2">
                            <label class="mb-1" for="start_date">Start Date</label>
                            <input class="form-control text-center" id="start_date" type="date" name="start_date" aria-describedby="start_date" value="{{ $task->start_date }}"/>
                            <x-input-error :messages="$errors->get('start_date')"/>
                        </div>
                        <div class="col-lg-6 mt-2">
                            <label class="mb-1" for="end_date">End Date</label>
                            <input class="form-control text-center" id="end_date" type="date" name="end_date" aria-describedby="end_date" value="{{ $task->end_date }}"/>
                            <x-input-error :messages="$errors->get('end_date')"/>
                        </div>
                        <div class="col-lg-6 mt-2">
                            <label class="mb-1" for="status">Status</label>
                            <select class="form-select" name="status" id="status">
                                <option value="Not Started" @if( $task->status == 'Not Started' ) selected @endif >Not Started</option>
                                <option value="In Progress" @if( $task->status == 'In Progress' ) selected @endif>In Progress</option>
                                <option value="Completed" @if( $task->status == 'Completed' ) selected @endif>Completed</option>
                            </select>
                            <x-input-error :messages="$errors->get('status')"/>
                        </div>
                        <div class="col-lg-6 mt-2">
                            <label class="mb-1" for="finish_date">Finish Date</label>
                            <input class="form-control text-center" id="finish_date" type="text" name="finish_date" aria-describedby="finish_date" readonly value="{{ $task->finish_date ?? '-' }}" readonly/>
                            <x-input-error :messages="$errors->get('finish_date')"/>
                        </div>
                        <div class="col-lg-12 mt-2">
                            <label class="mb-1" for="responsible">Responsible</label>
                            <select class="form-select" name="responsible[]" id="responsible" multiple>
                                @foreach ( $task->master->regulars as $user )
                                @php
                                    $isSelected = in_array($user->id, $task->users->pluck('id')->toArray());
                                @endphp
                                <option value="{{ $user->id }}" {{ $isSelected ? 'selected' : '' }}>{{ $user->name }}</option>
                                @endforeach
                            </select>
                            <x-input-error :messages="$errors->get('responsible')"/>
                        </div>
                        <div class="col-lg-12 mt-2">
                            <label class="mb-1" for="observation">Observation</label>
                            <textarea class="form-control" name="observation" id="" cols="30" rows="3">{{ $task->observation }}</textarea>
                            <x-input-error :messages="$errors->get('observation')"/>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <a class="btn btn-sm btn-warning" href="{{ route('tasks.index') }}"> <i class="fas fa-arrow-left me-2"></i> Return</a>
                    <button class="btn btn-sm btn-primary" type="submit"> <i class="fas fa-floppy-disk me-2"></i> Save</button>
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