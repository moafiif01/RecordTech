<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['store', 'update', 'destroy']);
    }
    public function index()
    {
    // return services in creation order (position column removed)
    return response()->json(Service::orderBy('id', 'asc')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'features' => 'nullable|array',
            'features.*' => 'nullable|string',
        ]);

        // ensure features present as array
        if (isset($data['features']) && ! is_array($data['features'])) {
            $data['features'] = json_decode($data['features'], true) ?? [];
        }

        $service = Service::create($data);
        return response()->json($service, 201);
    }

    public function show($id)
    {
        return response()->json(Service::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);
    $data = $request->validate([
        'title' => 'sometimes|required|string',
        'description' => 'nullable|string',
        'icon' => 'nullable|string',
        'features' => 'nullable|array',
        'features.*' => 'nullable|string',
    ]);
    if (isset($data['features']) && ! is_array($data['features'])) {
        $data['features'] = json_decode($data['features'], true) ?? [];
    }
    $service->update($data);
        return response()->json($service);
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();
        return response()->json(null, 204);
    }

    // Move service up or down by swapping positions
    public function move(Request $request, $id)
    {
        // Position-based move removed when dropping `position` column.
        return response()->json(['error' => 'Not implemented'], 501);
    }

    // Reorder services: accept array of ids in desired order and set positions accordingly
    public function reorder(Request $request)
    {
        // Reorder endpoint removed: position persistence was removed from the project.
        return response()->json(['error' => 'Reorder disabled - position removed'], 410);
    }
}
