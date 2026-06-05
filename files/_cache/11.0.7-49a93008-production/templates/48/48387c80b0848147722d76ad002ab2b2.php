<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;
use Twig\TemplateWrapper;

/* components/photoswipe.html.twig */
class __TwigTemplate_c89330421cd842ae48360139328ff4cd extends Template
{
    private Source $source;
    /**
     * @var array<string, Template>
     */
    private array $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        // line 32
        yield "
";
        // line 33
        $macros["fields"] = $this->macros["fields"] = $this->load("components/form/fields_macros.html.twig", 33)->unwrap();
        // line 34
        $context["rand"] = Twig\Extension\CoreExtension::random($this->env->getCharset());
        // line 35
        $context["field_name"] = ((array_key_exists("field_name", $context)) ? (Twig\Extension\CoreExtension::default(($context["field_name"] ?? null), ("psgallery" . ($context["rand"] ?? null)))) : (("psgallery" . ($context["rand"] ?? null))));
        // line 36
        yield "
";
        // line 37
        $context["imgs"] = ((array_key_exists("imgs", $context)) ? (Twig\Extension\CoreExtension::default(($context["imgs"] ?? null), [])) : ([]));
        // line 38
        $context["galleryclass"] = ((array_key_exists("gallery_class", $context)) ? (Twig\Extension\CoreExtension::default(($context["gallery_class"] ?? null), "")) : (""));
        // line 39
        $context["gallery_type"] = ((array_key_exists("gallery_type", $context)) ? (Twig\Extension\CoreExtension::default(($context["gallery_type"] ?? null), "")) : (""));
        // line 40
        $context["gallery_item_class"] = ((array_key_exists("gallery_item_class", $context)) ? (Twig\Extension\CoreExtension::default(($context["gallery_item_class"] ?? null), "")) : (""));
        // line 41
        yield "
";
        // line 42
        if ((($context["gallery_type"] ?? null) == "horizontal")) {
            // line 43
            yield "   <div class=\"col-12\">
      <div class=\"d-flex flex-row overflow-auto pswp-horizontal-gallery pswp-img";
            // line 44
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
            yield " ";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["gallery_item_class"] ?? null), "html", null, true);
            yield "\" itemscope itemtype=\"https://schema.org/ImageGallery\">
         ";
            // line 45
            $context['_parent'] = $context;
            $context['_seq'] = CoreExtension::ensureTraversable(($context["imgs"] ?? null));
            foreach ($context['_seq'] as $context["_key"] => $context["img"]) {
                // line 46
                yield "            <div class=\"";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(((CoreExtension::getAttribute($this->env, $this->source, $context["img"], "gallery_item_class", [], "array", true, true, false, 46)) ? (Twig\Extension\CoreExtension::default((($_v0 = $context["img"]) && is_array($_v0) || $_v0 instanceof ArrayAccess ? ($_v0["gallery_item_class"] ?? null) : null), "")) : ("")), "html", null, true);
                yield "\">
            ";
                // line 47
                if (CoreExtension::getAttribute($this->env, $this->source, $context["img"], "pre_figure_content", [], "array", true, true, false, 47)) {
                    // line 48
                    yield "               ";
                    yield (($_v1 = $context["img"]) && is_array($_v1) || $_v1 instanceof ArrayAccess ? ($_v1["pre_figure_content"] ?? null) : null);
                    yield "
            ";
                }
                // line 50
                yield "            <figure itemprop=\"associatedMedia\" itemscope itemtype=\"https://schema.org/ImageObject\" class=\"d-flex flex-column me-2\">
                  ";
                // line 51
                if ((($tmp = (((CoreExtension::getAttribute($this->env, $this->source, $context["img"], "_video", [], "array", true, true, false, 51) &&  !(null === (($_v2 = $context["img"]) && is_array($_v2) || $_v2 instanceof ArrayAccess ? ($_v2["_video"] ?? null) : null)))) ? ((($_v3 = $context["img"]) && is_array($_v3) || $_v3 instanceof ArrayAccess ? ($_v3["_video"] ?? null) : null)) : (false))) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
                    // line 52
                    yield "                     <span class=\"bg-black pswp-trigger pointer d-flex justify-content-center align-items-center\">
                        <i class=\"ti ti-video-filled\"></i>
                     </span>
                  ";
                } else {
                    // line 56
                    yield "                     <a href=\"";
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((($_v4 = $context["img"]) && is_array($_v4) || $_v4 instanceof ArrayAccess ? ($_v4["src"] ?? null) : null));
                    yield "\" itemprop=\"contentUrl\" data-index=\"0\">
                        <img src=\"";
                    // line 57
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(((CoreExtension::getAttribute($this->env, $this->source, $context["img"], "thumbnail_src", [], "array", true, true, false, 57)) ? (Twig\Extension\CoreExtension::default((($_v5 = $context["img"]) && is_array($_v5) || $_v5 instanceof ArrayAccess ? ($_v5["thumbnail_src"] ?? null) : null), (($_v6 = $context["img"]) && is_array($_v6) || $_v6 instanceof ArrayAccess ? ($_v6["src"] ?? null) : null))) : ((($_v7 = $context["img"]) && is_array($_v7) || $_v7 instanceof ArrayAccess ? ($_v7["src"] ?? null) : null))), "html", null, true);
                    yield "\"
                             itemprop=\"thumbnail\" alt=\"";
                    // line 58
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(((CoreExtension::getAttribute($this->env, $this->source, $context["img"], "title", [], "array", true, true, false, 58)) ? (Twig\Extension\CoreExtension::default((($_v8 = $context["img"]) && is_array($_v8) || $_v8 instanceof ArrayAccess ? ($_v8["title"] ?? null) : null), "")) : ("")), "html", null, true);
                    yield "\"
                             class=\"";
                    // line 59
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(((CoreExtension::getAttribute($this->env, $this->source, $context["img"], "img_class", [], "array", true, true, false, 59)) ? (Twig\Extension\CoreExtension::default((($_v9 = $context["img"]) && is_array($_v9) || $_v9 instanceof ArrayAccess ? ($_v9["img_class"] ?? null) : null), "")) : ("")), "html", null, true);
                    yield " pointer pswp-trigger\" />
                     </a>
                  ";
                }
                // line 62
                yield "               <figcaption itemprop=\"caption description\" class=\"text-muted fst-italic\">
                  ";
                // line 63
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(((CoreExtension::getAttribute($this->env, $this->source, $context["img"], "title", [], "array", true, true, false, 63)) ? (Twig\Extension\CoreExtension::default((($_v10 = $context["img"]) && is_array($_v10) || $_v10 instanceof ArrayAccess ? ($_v10["title"] ?? null) : null), "")) : ("")), "html", null, true);
                yield "
               </figcaption>
            </figure>
            ";
                // line 66
                if ((($tmp = (($_v11 = $context["img"]) && is_array($_v11) || $_v11 instanceof ArrayAccess ? ($_v11["post_figure_content"] ?? null) : null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
                    // line 67
                    yield "               ";
                    yield (($_v12 = $context["img"]) && is_array($_v12) || $_v12 instanceof ArrayAccess ? ($_v12["post_figure_content"] ?? null) : null);
                    yield "
            ";
                }
                // line 69
                yield "         </div>
         ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_key'], $context['img'], $context['_parent']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 71
            yield "      </div>
   </div>
";
        } else {
            // line 74
            yield "   <div class=\"pswp-img";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
            yield " ";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["gallery_item_class"] ?? null), "html", null, true);
            yield "\" itemscope itemtype=\"https://schema.org/ImageGallery\">
      ";
            // line 75
            $context['_parent'] = $context;
            $context['_seq'] = CoreExtension::ensureTraversable(($context["imgs"] ?? null));
            $context['loop'] = [
              'parent' => $context['_parent'],
              'index0' => 0,
              'index'  => 1,
              'first'  => true,
            ];
            if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof \Countable)) {
                $length = count($context['_seq']);
                $context['loop']['revindex0'] = $length - 1;
                $context['loop']['revindex'] = $length;
                $context['loop']['length'] = $length;
                $context['loop']['last'] = 1 === $length;
            }
            foreach ($context['_seq'] as $context["_key"] => $context["img"]) {
                // line 76
                yield "         ";
                $context["clearable"] = (($_v13 = $context["img"]) && is_array($_v13) || $_v13 instanceof ArrayAccess ? ($_v13["clearable"] ?? null) : null);
                // line 77
                yield "         <figure itemprop=\"associatedMedia\" itemscope itemtype=\"https://schema.org/ImageObject\"
                 style=\"width: ";
                // line 78
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(((CoreExtension::getAttribute($this->env, $this->source, $context["img"], "thumbnail_w", [], "array", true, true, false, 78)) ? (Twig\Extension\CoreExtension::default((($_v14 = $context["img"]) && is_array($_v14) || $_v14 instanceof ArrayAccess ? ($_v14["thumbnail_w"] ?? null) : null), "auto")) : ("auto")), "html", null, true);
                yield "; height: ";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(((CoreExtension::getAttribute($this->env, $this->source, $context["img"], "thumbnail_h", [], "array", true, true, false, 78)) ? (Twig\Extension\CoreExtension::default((($_v15 = $context["img"]) && is_array($_v15) || $_v15 instanceof ArrayAccess ? ($_v15["thumbnail_h"] ?? null) : null), "auto")) : ("auto")), "html", null, true);
                yield "\">
            ";
                // line 79
                yield $macros["fields"]->getTemplateForMacro("macro_imageField", $context, 79, $this->getSourceContext())->macro_imageField(...[(((((($tmp =                 // line 80
($context["clearable"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) ? ("pictures") : (($context["field_name"] ?? null))) . "_") . CoreExtension::getAttribute($this->env, $this->source, $context["loop"], "index0", [], "any", false, false, false, 80)), ((CoreExtension::getAttribute($this->env, $this->source,                 // line 81
$context["img"], "thumbnail_src", [], "array", true, true, false, 81)) ? (Twig\Extension\CoreExtension::default((($_v16 = $context["img"]) && is_array($_v16) || $_v16 instanceof ArrayAccess ? ($_v16["thumbnail_src"] ?? null) : null), (($_v17 = $context["img"]) && is_array($_v17) || $_v17 instanceof ArrayAccess ? ($_v17["src"] ?? null) : null))) : ((($_v18 = $context["img"]) && is_array($_v18) || $_v18 instanceof ArrayAccess ? ($_v18["src"] ?? null) : null))), "", ["no_label" => true, "full_width" => true, "mb" => "", "clearable" =>                 // line 87
($context["clearable"] ?? null), "class" => "cursor-pointer pswp-trigger", "alt" => ((CoreExtension::getAttribute($this->env, $this->source,                 // line 89
$context["img"], "title", [], "array", true, true, false, 89)) ? (Twig\Extension\CoreExtension::default((($_v19 = $context["img"]) && is_array($_v19) || $_v19 instanceof ArrayAccess ? ($_v19["title"] ?? null) : null), "")) : ("")), "itemprop" => "thumbnail"], ["itemprop" => "contentUrl", "data-index" => "0"]]);
                // line 96
                yield "
            <figcaption itemprop=\"caption description\" class=\"text-muted fst-italic\">
               ";
                // line 98
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(((CoreExtension::getAttribute($this->env, $this->source, $context["img"], "title", [], "array", true, true, false, 98)) ? (Twig\Extension\CoreExtension::default((($_v20 = $context["img"]) && is_array($_v20) || $_v20 instanceof ArrayAccess ? ($_v20["title"] ?? null) : null), "")) : ("")), "html", null, true);
                yield "
            </figcaption>
         </figure>
      ";
                ++$context['loop']['index0'];
                ++$context['loop']['index'];
                $context['loop']['first'] = false;
                if (isset($context['loop']['revindex0'], $context['loop']['revindex'])) {
                    --$context['loop']['revindex0'];
                    --$context['loop']['revindex'];
                    $context['loop']['last'] = 0 === $context['loop']['revindex0'];
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_key'], $context['img'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 102
            yield "   </div>
";
        }
        // line 104
        yield "
<script>
   ((\$) => {
      \$(\".pswp-img";
        // line 107
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["rand"] ?? null), "html", null, true);
        yield "\").on('click', 'figure .pswp-trigger', function(event) {
         event.preventDefault();
         const options = {
            bgOpacity: 0.7,
            dataSource: ";
        // line 111
        yield json_encode(($context["imgs"] ?? null));
        yield ",
            index: \$(this).closest('figure').parent().index(),

            close: ";
        // line 114
        yield ((array_key_exists("controls", $context)) ? ($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(json_encode(CoreExtension::getAttribute($this->env, $this->source, ($context["controls"] ?? null), "close", [], "any", false, false, false, 114)), "html", null, true)) : ("false"));
        yield ",
            zoom: ";
        // line 115
        yield ((array_key_exists("controls", $context)) ? ($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(json_encode(CoreExtension::getAttribute($this->env, $this->source, ($context["controls"] ?? null), "zoom", [], "any", false, false, false, 115)), "html", null, true)) : ("false"));
        yield ",

            arrowNextTitle: __('Next (arrow right)'),
            arrowPrevTitle: __('Previous (arrow left)'),
            closeTitle: __('Close (Esc)'),
            downloadTitle: __('Download'),
            zoomTitle: __('Zoom in/out'),
         };
         const gallery = new PhotoSwipe(options);
         gallery.on(
            'uiRegister',
            function () {
               this.ui.registerElement({
                  name: 'download',
                  isButton: true,
                  html: '<a class=\"text-white\" target=\"_blank\" download=\"\"><i class=\"fa-solid fa-download\"></i></a>',
                  order: 8,
                  onInit: (el, pswp) => {
                     pswp.on('change', () => {
                        el.getElementsByTagName('a')[0].href = pswp.currSlide.data.src;
                     });
                  }
               });
            }
         );
         gallery.init();
      })
   })(jQuery);
</script>
";
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "components/photoswipe.html.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable(): bool
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo(): array
    {
        return array (  242 => 115,  238 => 114,  232 => 111,  225 => 107,  220 => 104,  216 => 102,  198 => 98,  194 => 96,  192 => 89,  191 => 87,  190 => 81,  189 => 80,  188 => 79,  182 => 78,  179 => 77,  176 => 76,  159 => 75,  152 => 74,  147 => 71,  140 => 69,  134 => 67,  132 => 66,  126 => 63,  123 => 62,  117 => 59,  113 => 58,  109 => 57,  104 => 56,  98 => 52,  96 => 51,  93 => 50,  87 => 48,  85 => 47,  80 => 46,  76 => 45,  70 => 44,  67 => 43,  65 => 42,  62 => 41,  60 => 40,  58 => 39,  56 => 38,  54 => 37,  51 => 36,  49 => 35,  47 => 34,  45 => 33,  42 => 32,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "components/photoswipe.html.twig", "C:\\xampp\\htdocs\\glpi\\templates\\components\\photoswipe.html.twig");
    }
}
