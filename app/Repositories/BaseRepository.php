<?php

namespace App\Repositories;

class BaseRepository
{
    protected function __construct(protected object $obj)
    {
        $this->obj = $obj;
    }

    public function all(): object
    {
        return $this->obj->all();
    }

    public function find(int $id): object
    {
        return $this->obj->find($id);
    }

    public function findByColumn(string $column, $value): object
    {
        return $this->obj->where($column, $value)->get();
    }


    public function paginate(int $perPage = 15): object
    {
        return $this->obj->paginate($perPage);
    }

    public function store(array $attributes): object
    {
        return $this->obj->create($attributes);
    }

    public function update(int $id, array $attributes): bool
    {
        return $this->obj->find($id)->update($attributes);
    }

    public function delete(int $id): bool
    {
        return $this->obj->find($id)->delete();
    }
}
