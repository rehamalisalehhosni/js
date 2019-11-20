<?php

namespace Custom\Pages\Http\Controllers;

use Illuminate\Support\Facades\Event;
use Custom\Pages\Repositories\PagesRepository;
use Custom\Pages\Models\PagesTranslation;
use Custom\Pages\Models\TranslationsData;

/**
 * Pages pages controller
 *
 * @author    Jitendra Singh <jitendra@webkul.com>
 * @copyright 2018 Webkul Software Pvt Ltd (http://www.webkul.com)
 */
class PagesController extends Controller
{
    /**
     * Contains route related configuration
     *
     * @var array
     */
    protected $_config;

    /**
     * PagesRepository object
     *
     * @var Object
     */
    //protected $pagesRepository;

    /**
     * Create a new controller instance.
     *
     * @param  \Webkul\Pages\Repositories\PagesRepository   $pagesRepository
     * @return void
     */
    public function __construct(    )
    {
    //    $this->pagesRepository = $pagesRepository;

        $this->_config = request('_config');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $data_translate= TranslationsData::get()->toArray();
        
        return view($this->_config['view'],compact('data_translate'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $pages = $this->pagesRepository->getPagesTree(null, ['id']);
        return view($this->_config['view'], compact('pages'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        $this->validate(request(), [
            'name' => 'required',
        ]);

        if (strtolower(request()->input('name')) == 'root') {
            $pagesTransalation = new PagesTranslation();

            $result = $pagesTransalation->where('name', request()->input('name'))->get();

            if(count($result) > 0) {
                session()->flash('error', trans('admin::app.response.create-root-failure'));

                return redirect()->back();
            }
        }

        $pages = $this->pagesRepository->create(request()->all());

        session()->flash('success', trans('admin::app.response.create-success', ['name' => 'Pages']));

        return redirect()->route($this->_config['redirect']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    public function edit($id)
    {
        $pages = $this->pagesRepository->getPagesTree($id);

        $page = $this->pagesRepository->findOrFail($id);

        return view($this->_config['view'], compact('pages','page'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        $locale = request()->get('locale') ?: app()->getLocale();

        $this->validate(request(), [
            $locale . '.name' => 'required',
        ]);

        $this->pagesRepository->update(request()->all(), $id);

        session()->flash('success', trans('admin::app.response.update-success', ['name' => 'Pages']));

        return redirect()->route($this->_config['redirect']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $pages = $this->pagesRepository->findOrFail($id);

        if(strtolower($pages->name) == "root") {
            session()->flash('warning', trans('admin::app.response.delete-pages-root', ['name' => 'Pages']));
        } else {
            try {
                Event:: fire('custom.pages.delete.before', $id);

                $this->pagesRepository->delete($id);

                Event::fire('custom.pages.delete.after', $id);

                session()->flash('success', trans('admin::app.response.delete-success', ['name' => 'Pages']));

                return response()->json(['message' => true], 200);
            } catch(\Exception $e) {
                session()->flash('error', trans('admin::app.response.delete-failed', ['name' => 'Pages']));
            }
        }

        return response()->json(['message' => false], 400);
    }

    /**
     * Remove the specified resources from database
     *
     * @return response \Illuminate\Http\Response
     */
    public function massDestroy() {
        $suppressFlash = false;

        if (request()->isMethod('delete') || request()->isMethod('post')) {
            $indexes = explode(',', request()->input('indexes'));

            foreach ($indexes as $key => $value) {
                try {
                    Event::fire('custom.pages.delete.before', $value);

                    $this->pagesRepository->delete($value);

                    Event::fire('custom.pages.delete.after', $value);
                } catch(\Exception $e) {
                    $suppressFlash = true;

                    continue;
                }
            }

            if (! $suppressFlash)
                session()->flash('success', trans('admin::app.datagrid.mass-ops.delete-success'));
            else
                session()->flash('info', trans('admin::app.datagrid.mass-ops.partial-action', ['resource' => 'Attribute Family']));

            return redirect()->back();
        } else {
            session()->flash('error', trans('admin::app.datagrid.mass-ops.method-error'));

            return redirect()->back();
        }
    }
}
