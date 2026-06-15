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

/* __string_template__ef922a0f8b69f7441f9388020883a23f */
class __TwigTemplate_2965dc9b6dd4fd28760d94ec89a609b6 extends Template
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
        // line 1
        yield "            <script type=\"module\">
                (async () => {
                    await import('/js/modules/Dashboard/Dashboard.js');

                    const target = GLPI.Dashboard.getActiveDashboard() ?
                        GLPI.Dashboard.getActiveDashboard().element.find('#";
        // line 6
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["chart_id"] ?? null), "html", null, true);
        yield " .chart')
                        : \$('#";
        // line 7
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["chart_id"] ?? null), "html", null, true);
        yield " .chart');
                    const myChart = echarts.init(target[0]);
                    myChart.setOption(";
        // line 9
        yield json_encode(($context["options"] ?? null));
        yield ");
                    myChart
                        .on('click', function (params) {
                            const data_url = _.get(params, 'data.url', '');
                            if (data_url.length > 0) {
                                window.location.href = data_url;
                            }
                        });

                    target.on('mouseover', () => {
                        myChart.setOption({'toolbox': {'show': true}});
                    }).on('mouseout', () => {
                        myChart.setOption({'toolbox': {'show': false}});
                    });
                })();
            </script>";
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "__string_template__ef922a0f8b69f7441f9388020883a23f";
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
        return array (  58 => 9,  53 => 7,  49 => 6,  42 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "__string_template__ef922a0f8b69f7441f9388020883a23f", "");
    }
}
