@props(['messages'])

@if ($messages)
    <ul {{ $attributes->merge(['class' => 'small text-danger mb-0', 'style' => 'list-style: none; margin-top: 4px; margin-left: -15px;']) }}>
        @foreach ((array) $messages as $message)
            <li>{{ $message }}</li>
        @endforeach
    </ul>
@endif