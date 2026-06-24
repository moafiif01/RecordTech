<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function index()
    {
        return response()->json(Contact::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'company' => 'nullable|string',
            'service' => 'nullable|string',
            'message' => 'required|string',
        ]);

        $contact = Contact::create($data);



        return response()->json($contact, 201);
    }

    public function markAsRead($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->is_read = true;
        $contact->save();

        return response()->json($contact);
    }

    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json(['message' => 'Contact deleted successfully']);
    }
}
